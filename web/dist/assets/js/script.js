(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const toggleLabel = toggle?.querySelector(".sr-only");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const config = window.NAPLN_GYM_CONFIG || {};

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute("aria-expanded", "false");
    if (toggleLabel) toggleLabel.textContent = "Otevřít navigaci";
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      if (toggleLabel)
        toggleLabel.textContent = willOpen
          ? "Zavřít navigaci"
          : "Otevřít navigaci";
      mobileMenu.hidden = !willOpen;
      document.body.classList.toggle("menu-open", willOpen);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll("[data-scroll-to]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.dataset.scrollTo);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  });

  const syncHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 34);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) closeMenu();
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelectorAll(".faq-list details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      document
        .querySelectorAll(".faq-list details[open]")
        .forEach((openDetail) => {
          if (openDetail !== detail) openDetail.open = false;
        });
    });
  });

  const stackPlates = [
    ...document.querySelectorAll(".weight-progress__stack i"),
  ];
  const progressValue = document.querySelector("[data-progress-value]");
  let progressFrame = 0;

  const updateProgress = () => {
    progressFrame = 0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const filled = Math.round(progress * stackPlates.length);
    stackPlates.forEach((plate, index) =>
      plate.classList.toggle("is-filled", index < filled),
    );
    if (progressValue)
      progressValue.textContent = String(Math.round(progress * 100)).padStart(
        2,
        "0",
      );
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!progressFrame)
        progressFrame = window.requestAnimationFrame(updateProgress);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const bookingFrame = document.querySelector("[data-booking-frame]");
  const placeholder = document.querySelector("[data-booking-placeholder]");
  if (
    bookingFrame &&
    typeof config.bookingUrl === "string" &&
    /^https:\/\//i.test(config.bookingUrl)
  ) {
    const iframe = document.createElement("iframe");
    iframe.src = config.bookingUrl;
    iframe.title = "Rezervace schůzky s Naplň Gym";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "payment";
    placeholder?.remove();
    bookingFrame.appendChild(iframe);
  }

  const isValidEmail =
    typeof config.contactEmail === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail);
  if (isValidEmail) {
    document
      .querySelectorAll("[data-contact-email], [data-footer-email]")
      .forEach((link) => {
        link.href = `mailto:${config.contactEmail}`;
        link.textContent = link.hasAttribute("data-footer-email")
          ? config.contactEmail
          : "Napsat e-mail";
        link.hidden = false;
      });
  }

  const revealConfiguredText = (selector, value, prefix = "") => {
    if (typeof value !== "string" || !value.trim()) return;
    const element = document.querySelector(selector);
    if (!element) return;
    element.textContent = `${prefix}${value.trim()}`;
    element.hidden = false;
  };

  revealConfiguredText("[data-company-id]", config.companyId, "IČO: ");
  revealConfiguredText("[data-company-address]", config.companyAddress);

  const portrait = document.querySelector("[data-founder-portrait]");
  if (
    portrait &&
    typeof config.founderPhoto === "string" &&
    config.founderPhoto.trim() &&
    !/^javascript:/i.test(config.founderPhoto)
  ) {
    const safePhoto = config.founderPhoto.replace(
      /["'()]/g,
      encodeURIComponent,
    );
    portrait.style.backgroundImage = `url("${safePhoto}")`;
    portrait.classList.add("has-photo");
  }

  const memberEntry = document.querySelector("[data-member-entry]");
  const memberLayer = memberEntry?.querySelector("[data-member-layer]");
  const arrivalLayer = memberEntry?.querySelector("[data-arrival-layer]");
  const memberPrompt = memberEntry?.querySelector("[data-member-prompt]");
  const memberResult = memberEntry?.querySelector("[data-member-result]");
  const memberCountLabel = memberEntry?.querySelector("[data-member-count]");
  const memberSeparator = memberEntry?.querySelector(
    "[data-member-separator]",
  );
  const memberStatus = memberEntry?.querySelector("[data-member-status]");
  if (
    memberEntry &&
    memberLayer &&
    arrivalLayer &&
    memberPrompt &&
    memberResult &&
    memberCountLabel &&
    memberSeparator &&
    memberStatus
  ) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const memberCompletionDelay = prefersReducedMotion ? 60 : 1520;
    let memberCount = 0;

    const createSvgElement = (name, attributes = {}) => {
      const element = document.createElementNS(svgNamespace, name);
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value),
      );
      return element;
    };

    const routePosition = (progress) => {
      return {
        x: 426.5 + 307 * progress,
        y: 853 - 188.5 * progress,
      };
    };

    memberEntry.addEventListener("click", () => {
      const trail = createSvgElement("g", {
        class: "hero-logo__trail",
      });
      const stops = [0.04, 0.16, 0.28, 0.4, 0.52, 0.64, 0.76, 0.88, 0.94];

      stops.forEach((progress, index) => {
        const position = routePosition(progress);
        const nextPosition = routePosition(Math.min(progress + 0.01, 1));
        const directionX = nextPosition.x - position.x;
        const directionY = nextPosition.y - position.y;
        const directionLength = Math.hypot(directionX, directionY) || 1;
        const side = index % 2 === 0 ? -1 : 1;
        const lateralOffset = side * (16 - progress * 7);
        const x = position.x + (-directionY / directionLength) * lateralOffset;
        const y = position.y + (directionX / directionLength) * lateralOffset;
        const angle = (Math.atan2(directionY, directionX) * 180) / Math.PI + 90;
        const perspectiveScale = 1 - progress * 0.44;
        const footprintPosition = createSvgElement("g", {
          class: "hero-logo__footprint-position",
          transform: `translate(${x} ${y}) rotate(${angle}) scale(${perspectiveScale})`,
        });
        const footprint = createSvgElement("g", {
          class: "hero-logo__footprint",
          style: `--footprint-delay: ${index * 105}ms`,
        });
        const heel = createSvgElement("ellipse", {
          class: "hero-logo__footprint-shape",
          cx: "0",
          cy: "2",
          rx: "6",
          ry: "11",
        });
        const toe = createSvgElement("circle", {
          class: "hero-logo__footprint-shape",
          cx: "0",
          cy: "-9",
          r: "5.2",
        });

        footprint.append(heel, toe);
        footprintPosition.appendChild(footprint);
        trail.appendChild(footprintPosition);
      });

      memberLayer.appendChild(trail);
      const arrivalSignal = createSvgElement("g", {
        class: "hero-logo__arrival-signal",
        style: "--arrival-delay: 840ms",
      });
      const doorOutline = "674,331 794,393 794,696 674,634";
      const arrivalGlow = createSvgElement("polygon", {
        class: "hero-logo__arrival-glow",
        points: doorOutline,
      });
      const arrivalRing = createSvgElement("polygon", {
        class: "hero-logo__arrival-ring",
        points: doorOutline,
      });

      arrivalSignal.append(arrivalGlow, arrivalRing);
      arrivalLayer.appendChild(arrivalSignal);

      window.setTimeout(() => {
        memberCount += 1;

        const hasMilestone = memberCount >= 5;
        const status =
          memberCount >= 20
            ? "Takhle to má vypadat."
            : memberCount >= 10
              ? "Volná kapacita mizí."
              : memberCount >= 5
                ? "Začíná se to plnit."
                : memberCount === 1
                  ? "nový člen"
                  : "noví členové";

        memberPrompt.hidden = true;
        memberResult.hidden = false;
        memberCountLabel.textContent = hasMilestone
          ? `${memberCount} nových členů`
          : `${memberCount}.`;
        memberSeparator.hidden = !hasMilestone;
        memberStatus.textContent = status;
        const counterText = `${memberCountLabel.textContent}${
          hasMilestone ? " · " : " "
        }${status}`;
        memberEntry.setAttribute(
          "aria-label",
          `Poslat dalšího člena dovnitř. ${counterText}`,
        );

        const plusOne = document.createElement("span");
        plusOne.className = "hero-visual__plus-one";
        plusOne.textContent = "+1";
        plusOne.setAttribute("aria-hidden", "true");
        plusOne.style.setProperty(
          "--plus-offset",
          `${((memberCount - 1) % 5 - 2) * 24}px`,
        );
        memberEntry.appendChild(plusOne);
        window.setTimeout(() => plusOne.remove(), 900);
      }, memberCompletionDelay);

      window.setTimeout(() => trail.remove(), 1900);
      window.setTimeout(() => arrivalSignal.remove(), 1700);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const mobileBookingCta = document.querySelector(".mobile-booking-cta");
  const heroSection = document.getElementById("top");
  const bookingSection = document.getElementById("booking");
  const footer = document.querySelector(".site-footer");
  if (mobileBookingCta && heroSection && bookingSection && footer) {
    let mobileCtaFrame = 0;
    const elementIsVisible = (element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    };
    const syncMobileBookingCta = () => {
      mobileCtaFrame = 0;
      const heroPassed = heroSection.getBoundingClientRect().bottom <= 0;
      const shouldHide =
        window.innerWidth > 640 ||
        !heroPassed ||
        elementIsVisible(bookingSection) ||
        elementIsVisible(footer);
      mobileBookingCta.classList.toggle("is-hidden", shouldHide);
    };
    const requestMobileCtaSync = () => {
      if (mobileCtaFrame) return;
      mobileCtaFrame = window.requestAnimationFrame(syncMobileBookingCta);
    };

    syncMobileBookingCta();
    window.addEventListener("scroll", requestMobileCtaSync, { passive: true });
    window.addEventListener("resize", requestMobileCtaSync);
  }
})();

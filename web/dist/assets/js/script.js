(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const config = window.NAPLN_GYM_CONFIG || {};

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
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
  if (memberEntry && memberLayer) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let arrivalTimer = 0;

    const createSvgElement = (name, attributes = {}) => {
      const element = document.createElementNS(svgNamespace, name);
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value),
      );
      return element;
    };

    const pulseDoor = () => {
      window.clearTimeout(arrivalTimer);
      memberEntry.classList.remove("is-arriving");
      void memberEntry.offsetWidth;
      memberEntry.classList.add("is-arriving");
      arrivalTimer = window.setTimeout(
        () => memberEntry.classList.remove("is-arriving"),
        560,
      );
    };

    memberEntry.addEventListener("click", () => {
      if (reducedMotion.matches) {
        pulseDoor();
        return;
      }

      const member = createSvgElement("g", {
        class: "hero-logo__member",
        opacity: "1",
      });
      const head = createSvgElement("circle", {
        class: "hero-logo__member-head",
        cx: "0",
        cy: "-18",
        r: "11",
      });
      const bodyPath = "M0 -7v31M-15 7 0 0 15 7M-11 44 0 24 11 44";
      const outline = createSvgElement("path", {
        class: "hero-logo__member-outline",
        d: bodyPath,
      });
      const body = createSvgElement("path", {
        class: "hero-logo__member-body",
        d: bodyPath,
      });
      const motion = createSvgElement("animateMotion", {
        path: "M345 987 C520 987 650 964 742 900 C795 863 818 810 820 724",
        dur: "1.25s",
        begin: "0s",
        fill: "freeze",
        calcMode: "spline",
        keyTimes: "0;1",
        keySplines: "0.22 1 0.36 1",
      });
      const fade = createSvgElement("animate", {
        attributeName: "opacity",
        values: "1;1;0",
        keyTimes: "0;0.82;1",
        dur: "1.25s",
        begin: "0s",
        fill: "freeze",
      });

      member.append(head, outline, body, motion, fade);
      memberLayer.appendChild(member);
      window.setTimeout(pulseDoor, 1020);
      window.setTimeout(() => member.remove(), 1380);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const mobileBookingCta = document.querySelector(".mobile-booking-cta");
  const bookingSection = document.getElementById("booking");
  if (mobileBookingCta && bookingSection && "IntersectionObserver" in window) {
    const bookingObserver = new IntersectionObserver(
      ([entry]) => {
        mobileBookingCta.classList.toggle("is-hidden", entry.isIntersecting);
      },
      { threshold: 0.12 },
    );
    bookingObserver.observe(bookingSection);
  }
})();

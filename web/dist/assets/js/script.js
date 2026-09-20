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

    const createSvgElement = (name, attributes = {}) => {
      const element = document.createElementNS(svgNamespace, name);
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value),
      );
      return element;
    };

    const cubicPoint = (start, controlA, controlB, end, progress) => {
      const inverse = 1 - progress;
      return {
        x:
          inverse ** 3 * start.x +
          3 * inverse ** 2 * progress * controlA.x +
          3 * inverse * progress ** 2 * controlB.x +
          progress ** 3 * end.x,
        y:
          inverse ** 3 * start.y +
          3 * inverse ** 2 * progress * controlA.y +
          3 * inverse * progress ** 2 * controlB.y +
          progress ** 3 * end.y,
      };
    };

    const routePosition = (progress) => {
      if (progress <= 0.78) {
        return cubicPoint(
          { x: 300, y: 828 },
          { x: 430, y: 828 },
          { x: 585, y: 770 },
          { x: 674, y: 642 },
          progress / 0.78,
        );
      }

      const doorwayProgress = (progress - 0.78) / 0.22;
      return cubicPoint(
        { x: 674, y: 642 },
        { x: 688, y: 615 },
        { x: 706, y: 570 },
        { x: 718, y: 530 },
        doorwayProgress,
      );
    };

    memberEntry.addEventListener("click", () => {
      const trail = createSvgElement("g", {
        class: "hero-logo__trail",
      });
      const stops = [0.03, 0.14, 0.25, 0.36, 0.48, 0.6, 0.71, 0.81, 0.91];

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
      window.setTimeout(() => trail.remove(), 1900);
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

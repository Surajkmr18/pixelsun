document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const loaderNumber = document.querySelector(".loader-number");
  const loaderBar = document.querySelector(".loader-line span");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.add("loading");

  function startSite() {
    if (loader) {
      loader.style.pointerEvents = "none";
      if (window.gsap && !prefersReduced) {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            loader.remove();
            document.body.classList.remove("loading");
            animateHero();
          }
        });
      } else {
        loader.remove();
        document.body.classList.remove("loading");
        animateHero();
      }
    } else {
      document.body.classList.remove("loading");
      animateHero();
    }
  }

  if (window.gsap && !prefersReduced && loader) {
    gsap.to(loaderBar, { width: "100%", duration: 1.5, ease: "power2.inOut" });
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        loaderNumber.textContent = String(Math.floor(counter.value)).padStart(2, "0");
      },
      onComplete: startSite
    });
  } else {
    if (loaderNumber) loaderNumber.textContent = "100";
    if (loaderBar) loaderBar.style.width = "100%";
    setTimeout(startSite, 250);
  }

  function animateHero() {
    if (!window.gsap || prefersReduced) return;

    gsap.from(".hero-title span", {
      y: 100,
      opacity: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12
    });

    gsap.from(".hero-reveal", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.35,
      ease: "power3.out",
      stagger: 0.1
    });

    gsap.from(".hero-image img", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.to(".hero-glow", {
      scale: 1.15,
      opacity: 0.65,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  if (cursor && follower && window.gsap && !prefersReduced && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
    });

    document.querySelectorAll("a, button, .portfolio-item, .service-card").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(follower, { scale: 1.7, duration: 0.2 });
        cursor.classList.add("active");
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(follower, { scale: 1, duration: 0.2 });
        cursor.classList.remove("active");
      });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Active navigation
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        ));
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => navObserver.observe(section));
  }

  // Mobile menu
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  
  // ============================================
// PORTFOLIO CAROUSEL - FINAL FIX
// ============================================

const filterButtons =
  document.querySelectorAll(".filter-btn");

const portfolioItems =
  Array.from(document.querySelectorAll(".portfolio-item"));

const portfolioGrid =
  document.querySelector(".portfolio-grid");

const portfolioViewport =
  document.querySelector(".portfolio-viewport");

const portfolioPrev =
  document.querySelector(".portfolio-prev");

const portfolioNext =
  document.querySelector(".portfolio-next");

const portfolioDots =
  document.querySelector(".portfolio-dots");

let currentFilter = "logo";
let currentPage = 0;


/* =========================
   ITEMS PER PAGE
========================= */

function getItemsPerPage() {

  if (window.innerWidth <= 768) {
    return 1;
  }

  if (window.innerWidth <= 1100) {
    return 2;
  }

  return 3;
}


/* =========================
   FILTER ITEMS
========================= */

function getFilteredItems() {

  return portfolioItems.filter(item => {

    return (
      currentFilter === "all" ||
      item.dataset.category === currentFilter
    );

  });

}


/* =========================
   UPDATE PORTFOLIO
========================= */

function updatePortfolio() {

  if (
    !portfolioGrid ||
    !portfolioViewport
  ) {
    return;
  }


  const filteredItems =
    getFilteredItems();

  const itemsPerPage =
    getItemsPerPage();


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredItems.length /
        itemsPerPage
      )
    );


  /* Keep page valid */

  currentPage =
    Math.max(
      0,
      Math.min(
        currentPage,
        totalPages - 1
      )
    );


  /* =========================
     SHOW / HIDE ITEMS
  ========================= */

  portfolioItems.forEach(item => {

    const visible =
      currentFilter === "all" ||
      item.dataset.category === currentFilter;

    item.style.display =
      visible ? "block" : "none";

  });


  /* =========================
     WAIT FOR LAYOUT
  ========================= */

  requestAnimationFrame(() => {

    const viewportWidth =
      portfolioViewport.clientWidth;


    if (!viewportWidth) return;


    /* Get actual CSS gap */

    const gridStyle =
      window.getComputedStyle(
        portfolioGrid
      );

    const gap =
      parseFloat(
        gridStyle.columnGap
      ) || 0;


    /* =========================
       CALCULATE EXACT CARD WIDTH
    ========================= */

    let cardWidth;


    if (itemsPerPage === 1) {

      cardWidth =
        viewportWidth;

    } else {

      cardWidth =
        (
          viewportWidth -
          gap * (itemsPerPage - 1)
        ) /
        itemsPerPage;

    }


    /* =========================
       APPLY WIDTH TO VISIBLE CARDS
    ========================= */

    filteredItems.forEach(item => {

      item.style.flex =
        `0 0 ${cardWidth}px`;

      item.style.width =
        `${cardWidth}px`;

    });


    /* =========================
       MOVE SLIDER
    ========================= */

    const moveDistance =
      currentPage *
      (cardWidth + gap) *
      itemsPerPage;


    portfolioGrid.style.transform =
      `translate3d(-${moveDistance}px, 0, 0)`;


    /* =========================
       ARROWS
    ========================= */

    if (portfolioPrev) {

      portfolioPrev.disabled =
        currentPage === 0;

    }


    if (portfolioNext) {

      portfolioNext.disabled =
        currentPage >=
        totalPages - 1;

    }


    /* =========================
       DOTS
    ========================= */

    if (!portfolioDots) return;


    portfolioDots.innerHTML = "";


    for (
      let i = 0;
      i < totalPages;
      i++
    ) {

      const dot =
        document.createElement("button");

      dot.type = "button";

      dot.className =
        "portfolio-dot";


      if (i === currentPage) {

        dot.classList.add("active");

      }


      dot.setAttribute(
        "aria-label",
        `Go to portfolio page ${i + 1}`
      );


      dot.addEventListener(
        "click",
        () => {

          currentPage = i;

          updatePortfolio();

        }
      );


      portfolioDots.appendChild(dot);

    }

  });

}


/* =========================
   NEXT
========================= */

if (portfolioNext) {

  portfolioNext.addEventListener(
    "click",
    () => {

      const totalPages =
        Math.ceil(
          getFilteredItems().length /
          getItemsPerPage()
        );


      if (
        currentPage <
        totalPages - 1
      ) {

        currentPage++;

        updatePortfolio();

      }

    }
  );

}


/* =========================
   PREVIOUS
========================= */

if (portfolioPrev) {

  portfolioPrev.addEventListener(
    "click",
    () => {

      if (currentPage > 0) {

        currentPage--;

        updatePortfolio();

      }

    }
  );

}


/* =========================
   FILTER BUTTONS
========================= */

filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      currentFilter =
        button.dataset.filter;


      currentPage = 0;


      updatePortfolio();

    }
  );

});


/* =========================
   RESIZE
========================= */

let portfolioResizeTimer;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      portfolioResizeTimer
    );


    portfolioResizeTimer =
      setTimeout(() => {

        currentPage = 0;

        updatePortfolio();

      }, 150);

  }
);


/* =========================
   INITIAL LOAD
========================= */

updatePortfolio();

  // Contact form
  const contactForm = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");
  const formStatus = document.getElementById("form-status");

  if (contactForm && sendBtn && formStatus) {
    if (window.emailjs) {
      emailjs.init({ publicKey: "wzZ3JlxO3St3geadt" });
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!window.emailjs) {
        formStatus.textContent = "Email service is unavailable. Please try again later.";
        formStatus.className = "error";
        return;
      }

      sendBtn.disabled = true;
      sendBtn.textContent = "SENDING...";
      formStatus.textContent = "";
      formStatus.className = "";

      try {
        await emailjs.sendForm(
          "service_6hp1rlm",
          "template_m0ehbpp",
          contactForm
        );

        formStatus.textContent = "✓ Message sent successfully!";
        formStatus.className = "success";
        contactForm.reset();
      } catch (error) {
        console.error("EmailJS Error:", error);
        formStatus.textContent = "✕ Message could not be sent. Please try again.";
        formStatus.className = "error";
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "SEND MESSAGE →";
      }
    });
  }
});

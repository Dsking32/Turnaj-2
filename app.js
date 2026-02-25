document.addEventListener("DOMContentLoaded", () => {

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.getElementById("menuToggle");
  const closeNav = document.getElementById("closeNav");
  const navLinks = document.getElementById("navLinks");
  const navBackdrop = document.getElementById("navBackdrop");

  if (menuToggle && closeNav && navLinks && navBackdrop) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.add("active");
      navBackdrop.classList.add("active");
    });
    closeNav.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navBackdrop.classList.remove("active");
    });
    navBackdrop.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navBackdrop.classList.remove("active");
    });
  }

  // ===== INITIALIZE SWIPER GALLERY =====
  if (typeof Swiper !== "undefined") {

    const galleryEl = document.querySelector(".gallery-swiper");
    if (galleryEl) {
      new Swiper(galleryEl, {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: {
          el: galleryEl.querySelector(".swiper-pagination"),
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: galleryEl.querySelector(".swiper-button-next"),
          prevEl: galleryEl.querySelector(".swiper-button-prev"),
        },
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 1000,
      });
    }

    const sponsorsEl = document.querySelector(".sponsors-slider");
    if (sponsorsEl) {
      new Swiper(sponsorsEl, {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: {
          el: sponsorsEl.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: sponsorsEl.querySelector(".swiper-button-next"),
          prevEl: sponsorsEl.querySelector(".swiper-button-prev"),
        },
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    }
  }

  // ===== HERO ANIMATION =====
  const heroh1 = document.querySelector(".hero-animate");
  const herop  = document.querySelector(".hero-animate-delay");
  const herobtn = document.querySelector(".hero-btn-animate");
  

  // ===== MOUSE PARALLAX EFFECT =====
  const hero = document.querySelector(".hero");
  if (hero) {
    document.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX / window.innerWidth) * 10;
      const moveY = (e.clientY / window.innerHeight) * 10;
      const heroText = document.querySelector(".hero-text");
      if (heroText) {
        heroText.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
      }
    });
  }

  // ===== SCROLL-TO-TOP BUTTON =====
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollToTopBtn.classList.toggle("visible", window.pageYOffset > 300);
  });

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll(".primary-btn, .mode-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + "px";
      ripple.className = "ripple";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===== NEWSLETTER =====
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    const btn = newsletterForm.querySelector(".newsletter-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        const input = newsletterForm.querySelector(".newsletter-input");
        if (input && input.value) {
          input.value = "";
          btn.textContent = "✓ Subscribed!";
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-envelope"></i> Subscribe';
          }, 3000);
        }
      });
    }
  }

});
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

  // ===== INITIALIZE SWIPER =====
  if (typeof Swiper !== "undefined") {
    const galleryEl = document.querySelector(".gallery-swiper");
    if (galleryEl) {
      new Swiper(galleryEl, {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: galleryEl.querySelector(".swiper-pagination"), clickable: true, dynamicBullets: true },
        navigation: { nextEl: galleryEl.querySelector(".swiper-button-next"), prevEl: galleryEl.querySelector(".swiper-button-prev") },
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
        pagination: { el: sponsorsEl.querySelector(".swiper-pagination"), clickable: true },
        navigation: { nextEl: sponsorsEl.querySelector(".swiper-button-next"), prevEl: sponsorsEl.querySelector(".swiper-button-prev") },
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

  // ===== MOUSE PARALLAX =====
  const hero = document.querySelector(".hero");
  if (hero) {
    document.addEventListener("mousemove", (e) => {
      const heroText = document.querySelector(".hero-text");
      if (heroText) {
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        heroText.style.transform = "translate(" + (moveX * 0.5) + "px, " + (moveY * 0.5) + "px)";
      }
    });
  }

  // ===== SCROLL TO TOP =====
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  document.body.appendChild(scrollToTopBtn);
  scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => scrollToTopBtn.classList.toggle("visible", window.pageYOffset > 300));

  // ===== RIPPLE =====
  document.querySelectorAll(".primary-btn, .mode-btn").forEach((button) => {
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

  // ===== TOAST =====
  function showToast(message, type) {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();
    const colors = { success: "#2a7a3b", error: "#c0392b", info: "#4f1c93" };
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    toast.style.cssText = "position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);background:" + (colors[type] || colors.info) + ";color:#fff;padding:14px 28px;border-radius:50px;font-size:0.95rem;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.2);opacity:0;transition:opacity 0.3s ease,transform 0.3s ease;max-width:90vw;text-align:center;";
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ===== NEWSLETTER — calls /subscribe on the Node server =====
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    const input = form.querySelector(".newsletter-input");
    const btn   = form.querySelector(".newsletter-btn");
    if (!input || !btn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email) return;

      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
      btn.disabled = true;
      input.disabled = true;

      try {
        const res  = await fetch("/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok && data.success) {
          input.value = "";
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
          btn.style.background = "#2a7a3b";
          showToast("You are subscribed! Check your email.", "success");
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = "";
            btn.disabled = false;
            input.disabled = false;
          }, 4000);
        } else {
          throw new Error(data.message || "Something went wrong.");
        }

      } catch (err) {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        input.disabled = false;
        showToast(err.message || "Failed to subscribe. Please try again.", "error");
      }
    });
  });

});

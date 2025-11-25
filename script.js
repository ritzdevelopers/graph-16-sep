// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const navLinks = document.querySelectorAll(".ach");
const navBtn = document.querySelector(".achBtn");

// Check if elements exist before adding event listeners
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    
    // Toggle menu icons
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    }
    
    if (isHidden) {
      // Show menu
      mobileMenu.classList.remove("hidden");
      // Animate in with GSAP if available
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          mobileMenu,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3 }
        );
      } else {
        // Fallback if GSAP not loaded yet
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "translateY(-20px)";
        setTimeout(() => {
          mobileMenu.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          mobileMenu.style.opacity = "1";
          mobileMenu.style.transform = "translateY(0)";
        }, 10);
      }
    } else {
      // Hide menu
      if (typeof gsap !== "undefined") {
        gsap.to(mobileMenu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            mobileMenu.classList.add("hidden");
          }
        });
      } else {
        mobileMenu.style.opacity = "0";
        mobileMenu.style.transform = "translateY(-20px)";
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    }
  });
}

// Close mobile menu when clicking on links
if (mobileMenu) {
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      // Reset icons
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
    });
  });
}

// GSAP Animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll animation + background change
let lastScroll = 0;
const navbar = document.querySelector("nav");

// Initialize navbar state on page load
if (navbar && window.scrollY === 0) {
  navbar.classList.remove("bg-white", "shadow-md", "scroll-down");
  navbar.classList.add("bg-transparent");
  gsap.set(navbar, { y: 0 });
  navbar.style.transform = "translateY(0px)";
}

const gfLogo = document.getElementById("gfLogo");
// Also check on initial scroll position
window.addEventListener("load", () => {
  if (navbar && window.scrollY === 0) {
    navbar.classList.remove("bg-white", "shadow-md", "scroll-down");
    navbar.classList.add("bg-transparent");
    gsap.set(navbar, { y: 0 });
    navbar.style.transform = "translateY(0px)";
    navbar.style.opacity = "1";
    navbar.style.visibility = "visible";
    gfLogo.src = "./images/130_58_wht.png";
  }
});

// Continuous check to ensure navbar is visible at top - only when at top
let navbarCheckInterval = null;
function startNavbarTopCheck() {
  if (navbarCheckInterval) return; // Already running
  
  navbarCheckInterval = setInterval(() => {
    if (navbar && (window.scrollY === 0 || window.scrollY < 5)) {
      // Force navbar to be visible at top
      gsap.killTweensOf(navbar);
      gsap.set(navbar, { y: 0, zIndex: 99999 });
      navbar.style.cssText += "transform: translateY(0px) !important; opacity: 1 !important; visibility: visible !important; display: block !important;";
      navbar.classList.remove("scroll-down", "scroll-up");
      gfLogo.src = "./images/130_58_wht.png";
    }
  }, 100); // Check every 100ms when at top
}

function stopNavbarTopCheck() {
  if (navbarCheckInterval) {
    clearInterval(navbarCheckInterval);
    navbarCheckInterval = null;
  }
}

// Additional safeguard: Check navbar visibility at top
function ensureNavbarVisibleAtTop() {
  if (window.scrollY === 0 && navbar) {
    gsap.killTweensOf(navbar);
    gsap.set(navbar, { y: 0 });
    navbar.classList.remove("scroll-down", "scroll-up");
    gfLogo.src = "./images/130_58_wht.png";
  }
}

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // ✅ Always show navbar at the top (scroll position 0) - HIGHEST PRIORITY
  if (currentScroll === 0 || currentScroll < 5) {
    // Start continuous check to keep navbar visible
    startNavbarTopCheck();
    
    // Kill ALL GSAP animations on navbar immediately
    gsap.killTweensOf(navbar);
    
    // Remove any scroll classes
    navbar.classList.remove("scroll-down", "scroll-up");
    
    // Set navbar position immediately with highest priority z-index
    gsap.set(navbar, { y: 0, zIndex: 99999 });
    navbar.style.cssText += "transform: translateY(0px) !important; opacity: 1 !important; visibility: visible !important; display: block !important; position: fixed !important;";
    
    // Background styling for top
    navbar.classList.remove("bg-white", "shadow-md");
    navbar.classList.add("bg-transparent");
    
    navLinks.forEach((itm) => {
      itm.classList.remove("text-black");
    });
    if (navBtn) navBtn.classList.remove("border-[1px]", "border-black");
    if (mobileMenuButton) mobileMenuButton.classList.remove("text-black");
    
    lastScroll = currentScroll;
    return; // Exit early - don't process any other scroll logic
  } else {
    // Stop continuous check when not at top
    stopNavbarTopCheck();
  }

  // ✅ Background change logic when not at top
  navbar.classList.remove("bg-transparent");
  navbar.classList.add("bg-white", "shadow-md");
  navLinks.forEach((itm) => {
    itm.classList.add("text-black");
  });
  if (navBtn) navBtn.classList.add("border-[1px]", "border-black");
  if (mobileMenuButton) mobileMenuButton.classList.add("text-black");

  // ✅ Show / hide navbar on scroll (only when scrolled down from top)
  if (currentScroll > lastScroll && currentScroll > 50 && !navbar.classList.contains("scroll-down")) {
    // Scrolling down - hide navbar
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
    gfLogo.src = "./images/130_58_blu.png";
    gsap.to(navbar, { y: -100, duration: 0.3 });
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scrolling up - show navbar
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    gfLogo.src = "./images/130_58_blu.png";
    gsap.to(navbar, { y: 0, duration: 0.3 });
  }

  lastScroll = currentScroll;
});
// gsap + scrolltrigger setup
gsap.registerPlugin(ScrollTrigger);

// reusable animation function
function animateOnScroll(target, delay = 0) {
  gsap.from(target, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: delay,
    scrollTrigger: {
      trigger: target,
      start: "top 85%", // when enters viewport
      toggleActions: "play none none reverse",
    },
  });
}
// Section 1
animateOnScroll("section:nth-of-type(1) h1");
animateOnScroll("section:nth-of-type(1) p", 0.2);
animateOnScroll("section:nth-of-type(1) button", 0.4);
animateOnScroll("section:nth-of-type(1) .absolute", 0.6);

// Section 2
animateOnScroll("section:nth-of-type(2) .top h2");
animateOnScroll("section:nth-of-type(2) .top p", 0.2);
animateOnScroll("section:nth-of-type(2) .btmCardsContainer .card1", 0.3);

// Section 3
animateOnScroll("section:nth-of-type(3) h2");
animateOnScroll("section:nth-of-type(3) p", 0.2);
animateOnScroll("section:nth-of-type(3) ol", 0.3);
animateOnScroll("section:nth-of-type(3) button", 0.4);
animateOnScroll("section:nth-of-type(3) img", 0.5);

// Section 4
animateOnScroll("section:nth-of-type(4) h2");
animateOnScroll("section:nth-of-type(4) p", 0.2);
animateOnScroll("section:nth-of-type(4) img", 0.3);
animateOnScroll("section:nth-of-type(4) ul li", 0.4);

// Section 5
animateOnScroll("section:nth-of-type(5) h2");
animateOnScroll("section:nth-of-type(5) p", 0.2);
animateOnScroll("section:nth-of-type(5) .who-we-are-box", 0.3);

// Section 6
animateOnScroll("section:nth-of-type(6) h2");
animateOnScroll("section:nth-of-type(6) p", 0.2);
animateOnScroll("section:nth-of-type(6) .sliderContainer", 0.3);
animateOnScroll("section:nth-of-type(6) .btns", 0.4);

// Section 7
animateOnScroll("section:nth-of-type(7) .form");
animateOnScroll("section:nth-of-type(7) h2", 0.2);
animateOnScroll("section:nth-of-type(7) input", 0.3);
animateOnScroll("section:nth-of-type(7) textarea", 0.4);
animateOnScroll("section:nth-of-type(7) button[type=submit]", 0.5);

// Section 8
animateOnScroll("section:nth-of-type(8) h2");

// Slider Logic Is Written Here
document.addEventListener("DOMContentLoaded", function () {
  const sliderCards = document.querySelectorAll(".sliderCard");
  const leftBtn = document.querySelector(".lftBtn");
  const rightBtn = document.querySelector(".rghtBtn");

  let currentIndex = 0;

  sliderCards.forEach((card, i) => {
    card.style.position = "absolute";
    card.style.top = "0";
    card.style.left = "0";
    card.style.width = "100%";
    card.style.transition = "transform 0.5s ease"; // Smooth sliding
    card.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
  });

  function showSlide(index) {
    if (index < 0) {
      currentIndex = sliderCards.length - 1;
    } else if (index >= sliderCards.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    sliderCards.forEach((card, i) => {
      if (i === currentIndex) {
        card.style.transform = "translateX(0)"; // Current card visible
      } else if (i < currentIndex) {
        card.style.transform = "translateX(-100%)"; // Left side
      } else {
        card.style.transform = "translateX(100%)"; // Right side
      }
    });
  }

  // Button clicks
  leftBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  rightBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });
});

// Video Play Togle Handler
const videoModal = document.getElementById("videoModal");
const videoContainer = videoModal
  ? videoModal.querySelector(".video-container")
  : null;
const videoPlayBtn = document.getElementById("vdoPlayer");
const videoCloseBtn = document.getElementById("vdoCloseBtn");
const videoFile = document.getElementById("videoFile");

// Defensive checks
if (!videoModal) console.warn("videoModal not found in DOM");
if (!videoContainer)
  console.warn(
    "video-container not found in DOM — add class 'video-container' to the container"
  );
if (!videoFile) console.warn("videoFile not found in DOM");
if (!videoPlayBtn) console.warn("vdoPlayer (play button) not found in DOM");
if (!videoCloseBtn) console.warn("vdoCloseBtn (close button) not found in DOM");

// Open Modal
function openModal() {
  if (!videoModal || !videoContainer) return;

  // show container immediately (so layout exists)
  videoModal.classList.remove("hidden");

  // ensure any previous tweens are killed
  gsap.killTweensOf([videoModal, videoContainer]);

  // overlay fade-in
  gsap.fromTo(
    videoModal,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "power1.out" }
  );

  // container zoom-in
  gsap.fromTo(
    videoContainer,
    { scale: 0.8, y: 60, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
  );

  // play video (catch in case of browser autoplay restrictions)
  if (videoFile) {
    videoFile.currentTime = 0;
    videoFile.muted = false; // if you want sound on open; set true if required
    videoFile.play().catch((err) => {
      // autoplay might be blocked; keep controls so user can play
      console.warn("video play blocked:", err);
    });
  }
}

// Close Modal
function closeModal() {
  if (!videoModal || !videoContainer) return;

  // kill previous tweens
  gsap.killTweensOf([videoModal, videoContainer]);

  // container zoom-out
  gsap.to(videoContainer, {
    scale: 0.8,
    y: 60,
    opacity: 0,
    duration: 0.45,
    ease: "power3.in",
  });

  // overlay fade-out (slightly delayed so container animation is visible)
  gsap.to(videoModal, {
    opacity: 0,
    duration: 0.28,
    delay: 0.1,
    ease: "power1.in",
    onComplete: () => {
      videoModal.classList.add("hidden");
      // safe video stop
      if (videoFile) {
        try {
          videoFile.pause();
          videoFile.currentTime = 0;
        } catch (e) {
          /* ignore */
        }
      }
    },
  });
}

// Event listeners
if (videoPlayBtn) videoPlayBtn.addEventListener("click", openModal);
if (videoCloseBtn) videoCloseBtn.addEventListener("click", closeModal);

// close on overlay click outside container
videoModal &&
  videoModal.addEventListener("click", (e) => {
    if (!videoContainer) return;
    if (!videoContainer.contains(e.target)) closeModal();
  });

// Esc key to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function heroVideoAnimation() {
  const img = document.querySelector("#vdoPlayer");
  const vdo = document.querySelector(".vdo");
  const acVid = document.querySelector(".acVid");
  const acImg = document.querySelector(".acImg");
  // Only apply hero video animation on desktop (larger than 1024px)
  if (window.innerWidth > 1440) {
    gsap.to(".vdc", {
      width: "100vw",
      height: "130vh",
      bottom: "0",
      left: "0",
      position: "absolute",
      zIndex: "9999",
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".vdc",
        start: "top 35%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
        onEnter: () => {
          if (vdo)
            vdo.play(),
              (img.style.display = "none"),
              (acVid.style.display = "block"),
              (acImg.style.display = "none");
        },
        onLeaveBack: () => {
          if (vdo) {
            vdo.pause();
            acVid.style.display = "none";
            img.style.display = "flex";
            acImg.style.display = "block";
            vdo.currentTime = 0;
          }
        },
      },
    });

    gsap.to(".s1", {
      height: "320vh",
      ease: "power3.out",

      scrollTrigger: {
        trigger: "main",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });

    gsap.to(".s1", {
      background: "white",
      scrollTrigger: {
        trigger: ".vdc",
        start: "top -10%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
        onEnter: () => {
          gsap.to(".s1", {
            position: "sitcky",
            top: "10%",
            left: "0",
            zIndex: "-9999",
          });
        },
        onLeaveBack: () => {
          gsap.to(".s1", {
            position: "relative",
            zIndex: "9999",
            duration: 0.3,
          });
        },
      },
    });
  }
}
heroVideoAnimation();

// Re-initialize video animation on window resize (only for desktop)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-run animation check on resize to handle orientation changes
    if (window.innerWidth <= 1024) {
      // Reset video container styles on tablet/mobile
      const vdc = document.querySelector(".vdc");
      if (vdc) {
        vdc.style.width = "";
        vdc.style.height = "";
        vdc.style.position = "";
        vdc.style.bottom = "";
        vdc.style.left = "";
        vdc.style.zIndex = "";
      }
    } else {
      heroVideoAnimation();
    }
  }, 250);
});

// Site-Visit Modal Form handlers
(function initSiteVisitModal() {
  const formModal = document.getElementById("siteVisitModal");
  const formClose = document.getElementById("siteVisitClose");
  const formTriggers = document.querySelectorAll('[data-open-form="true"]');
  const htmlEl = document.documentElement;
  const bodyEl = document.body;

  function openFormModal(e) {
    if (e) e.preventDefault();
    if (!formModal) return;
    formModal.classList.remove("hidden");
    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";
  }

  function closeFormModal() {
    if (!formModal) return;
    formModal.classList.add("hidden");
    htmlEl.style.overflow = "";
    bodyEl.style.overflow = "";
  }

  formTriggers.forEach((btn) => btn.addEventListener("click", openFormModal));
  formClose && formClose.addEventListener("click", closeFormModal);
  formModal &&
    formModal.addEventListener("click", (e) => {
      const container = formModal.querySelector(".rounded-xl");
      if (container && !container.contains(e.target)) closeFormModal();
    });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFormModal();
  });
})();

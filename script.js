// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".ach");
const navBtn = document.querySelector(".achBtn");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  gsap.fromTo(
    mobileMenu,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.3 }
  );
});

// Close mobile menu when clicking on links
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// GSAP Animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll animation + background change
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // ✅ Background change logic
  if (currentScroll === 0) {
    navbar.classList.remove("bg-white", "shadow-md");
    navbar.classList.add("bg-transparent");
    navLinks.forEach((itm) => {
      itm.classList.remove("text-black");
    });
    navBtn.classList.remove("border-[1px]", "border-black");
    mobileMenuButton.classList.remove("text-black");
  } else {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-white", "shadow-md");
    navLinks.forEach((itm) => {
      itm.classList.add("text-black");
    });
    navBtn.classList.add("border-[1px]", "border-black");
    mobileMenuButton.classList.add("text-black");
  }

  // ✅ Show / hide navbar on scroll
  if (currentScroll > lastScroll && !navbar.classList.contains("scroll-down")) {
    // Scrolling down
    navbar.classList.remove("scroll-up");
    navbar.classList.add("scroll-down");
    gsap.to(navbar, { y: -100, duration: 0.3 });
  } else if (
    currentScroll < lastScroll &&
    navbar.classList.contains("scroll-down")
  ) {
    // Scrolling up
    navbar.classList.remove("scroll-down");
    navbar.classList.add("scroll-up");
    gsap.to(navbar, { y: 0, duration: 0.3 });
  }

  lastScroll = currentScroll;
});
// Menu ↔ Close icon toggle
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

mobileMenuButton.addEventListener("click", () => {
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// Jab mobile nav link click ho → phir se menu icon show ho
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
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

    // setup all slides for fade animation
    sliderCards.forEach((card, i) => {
      card.style.position = "absolute";
      card.style.top = "0";
      card.style.left = "0";
      card.style.width = "100%";
      card.style.opacity = i === 0 ? "1" : "0";
      card.style.transition = "opacity 0.6s ease-in-out";
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
        card.style.opacity = i === currentIndex ? "1" : "0";
      });
    }

    leftBtn.addEventListener("click", () => {
      showSlide(currentIndex - 1);
    });

    rightBtn.addEventListener("click", () => {
      showSlide(currentIndex + 1);
    });
  });
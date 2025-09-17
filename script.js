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
        mobileMenuButton.classList.remove("text-black")
  } else {
    navbar.classList.remove("bg-transparent");
    navbar.classList.add("bg-white", "shadow-md");
    navLinks.forEach((itm) => {
      itm.classList.add("text-black");
    });
    navBtn.classList.add("border-[1px]", "border-black");
    mobileMenuButton.classList.add("text-black")
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



/* ScrollReveal: one shared instance, created first so EVERY section can use it.
   (Skipped quietly if the library failed to load.) */
const sr =
  typeof ScrollReveal !== "undefined"
    ? ScrollReveal({
        origin: "top",
        distance: "50px",
        duration: 1400,
        delay: 150,
      })
    : null;
 
// <!--==================== HEADER / NAV ====================-->
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const themeButton = document.getElementById("theme-button");
 
/* Open / close the mobile menu and swap the toggle icon */
const setMenu = (open) => {
  navMenu.classList.toggle("show-menu", open);
  navToggle.querySelector("i").className = open
    ? "ri-close-line"
    : "ri-menu-5-fill";
};
 
navToggle.addEventListener("click", () => {
  setMenu(!navMenu.classList.contains("show-menu"));
});
 
/* Close the menu after picking a link, clicking outside, or pressing Esc */
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
 
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    setMenu(false);
  }
});
 
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
 
/* Light / dark theme (remembered between visits) */
const applyTheme = (dark) => {
  document.body.classList.toggle("dark-theme", dark);
  themeButton.classList.toggle("ri-sun-fill", dark);
  themeButton.classList.toggle("ri-moon-fill", !dark);
};
 
applyTheme(localStorage.getItem("oraimo-theme") === "dark");
 
themeButton.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark-theme");
  applyTheme(dark);
  localStorage.setItem("oraimo-theme", dark ? "dark" : "light");
});
 
/* Header shadow on scroll + highlight the active link while scrolling.
   Works for the top nav AND the mobile tab bar: any link whose href
   matches the id of the section currently in view gets highlighted. */
const sections = document.querySelectorAll("section[id], footer[id]");
 
const scrollActive = () => {
  const scrollY = window.scrollY;
 
  header.classList.toggle("shadow-header", scrollY >= 50);
 
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const inView = scrollY > top && scrollY <= top + section.offsetHeight;
 
    document
      .querySelectorAll(
        `.nav__link[href="#${section.id}"], .tabbar a[href="#${section.id}"]`
      )
      .forEach((link) => {
        const activeClass = link.matches(".nav__link") ? "active-link" : "active";
        link.classList.toggle(activeClass, inView);
      });
  });
};
 
window.addEventListener("scroll", scrollActive);
scrollActive();
 
/* ScrollReveal: logo slides in from the left, icons from the right.
   Nav links are only revealed on desktop: on mobile the menu sits
   off-screen, so they would never trigger and would stay invisible.
   (The menu toggle is skipped on purpose: its CSS rotate must keep working.) */
sr?.reveal(".nav__logo", { origin: "left", distance: "30px", delay: 100 });
sr?.reveal(".nav__actions", { origin: "right", distance: "30px", delay: 100 });
 
if (window.matchMedia("(min-width: 1150px)").matches) {
  sr?.reveal(".nav__list li", { interval: 80, delay: 200 });
}
 
 
//  <!--==================== MAIN ====================-->
/* The <main> wrapper has no animation of its own: each section inside it
   reveals itself below. Shared cart logic lives here. */
 
/* Cart counter: header badge and tab-bar badge share the .js-count class */
const cartCounters = document.querySelectorAll(".js-count");
let cartCount = Number(localStorage.getItem("oraimo-cart")) || 0;
 
const renderCart = () => {
  cartCounters.forEach((el) => (el.textContent = cartCount));
};
 
renderCart();
 
 
// <!--==================== HERO SLIDER ====================-->
/* Swiper: fade between slides, autoplay, dots and arrows */
if (typeof Swiper !== "undefined" && document.querySelector(".hero__swiper")) {
  const heroSwiper = new Swiper(".hero__swiper", {
    loop: true,
    speed: 900,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: document.querySelector(".hero__pagination"),
      clickable: true,
    },
    navigation: {
      nextEl: document.querySelector(".hero__next"),
      prevEl: document.querySelector(".hero__prev"),
    },
  });
}
 
/* ScrollReveal: image fades in, then the text stacks in from the left,
   the benefit icons rise one by one, and "Music Moves You" arrives last.
   (ScrollReveal keeps the comment's existing rotate(-10deg).) */
sr?.reveal(".hero__swiper", { distance: "0px", duration: 1800, delay: 0 });
sr?.reveal(".hero__subtitle", { origin: "left", distance: "40px" });
sr?.reveal(".hero__title", { origin: "left", distance: "40px", delay: 300 });
sr?.reveal(".hero__description", { origin: "left", distance: "40px", delay: 450 });
sr?.reveal(".hero .button", { origin: "left", distance: "40px", delay: 600 });
sr?.reveal(".hero__link", { origin: "bottom", distance: "30px", interval: 120, delay: 750 });
sr?.reveal(".hero__comment", { origin: "right", distance: "40px", delay: 900 });
/* Hero image: fades in while settling from a slight zoom */
sr?.reveal(".hero__img", { distance: "0px", scale: 1.15, duration: 2000, delay: 0 });
sr?.reveal(".hero__swiper", { distance: "0px", duration: 1800, delay: 0 });
 
 
// <!--==================== SHOP BY CATEGORY ====================-->
sr?.reveal(".category .section__subtitle, .category .section__title");
sr?.reveal(".category__card", { interval: 100 });
 
 
// <!--==================== BEST SELLERS ====================-->
sr?.reveal(".products .section__subtitle, .products .section__title");
sr?.reveal(".products__card", { interval: 100 });
 
/* Add to Cart: bump the counter, save it, and give the button feedback */
document.querySelectorAll(".products__button").forEach((button) => {
  const label = button.textContent;
 
  button.addEventListener("click", () => {
    cartCount++;
    localStorage.setItem("oraimo-cart", cartCount);
    renderCart();
 
    button.textContent = "Added ✓";
    button.disabled = true;
 
    setTimeout(() => {
      button.textContent = label;
      button.disabled = false;
    }, 1200);
  });
});
 
 
// <!--==================== TRUST STRIP ====================-->
sr?.reveal(".trust__item", { origin: "bottom", distance: "30px", interval: 150 });
 
 
// <!--==================== FOOTER ====================-->
sr?.reveal(".footer__container > div", { origin: "bottom", distance: "30px", interval: 100 });
sr?.reveal(".footer__bottom", { origin: "bottom", distance: "20px", delay: 300 });
 
/* Newsletter form: validate the email and show a message */
const newsForm = document.getElementById("news-form");
const newsEmail = document.getElementById("news-email");
const newsMsg = document.getElementById("news-msg");
let newsTimer;
 
newsForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const email = newsEmail.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
  newsMsg.style.color = valid ? "" : "hsl(5, 75%, 62%)";
  newsMsg.textContent = valid
    ? "Thanks for subscribing!"
    : "Please enter a valid email address.";
 
  if (valid) newsForm.reset();
 
  clearTimeout(newsTimer);
  newsTimer = setTimeout(() => (newsMsg.textContent = ""), 4000);
});
 
 

"use strict";

// Native links remain usable without JavaScript.
const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
let clearCopyStatus;
if (copyButton && copyStatus && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText("jkims@soongsil.ac.kr");
      copyStatus.textContent = "Copied!";
    } catch (error) {
      copyStatus.textContent = "Select the address above to copy it.";
    }
    clearTimeout(clearCopyStatus);
    clearCopyStatus = setTimeout(function () { copyStatus.textContent = ""; }, 5000);
  });
}

if ("IntersectionObserver" in window) {
  const navLinks = Array.from(document.querySelectorAll("nav a[href^='#']"));
  const sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          const active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
  sections.forEach(function (section) { observer.observe(section); });
}

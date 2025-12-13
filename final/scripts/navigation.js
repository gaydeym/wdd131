/**
 * @module navigation
 */

import { getElement, toggleClass, removeClass, getElements } from "./utils.js";

export function setupMobileNav() {
    const mobileToggle =
        getElement("mobile-toggle") || document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!mobileToggle || !navLinks) return;

    // Toggle menu on button click
    mobileToggle.addEventListener("click", () => {
        toggleClass(navLinks, "active");
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            removeClass(navLinks, "active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
            removeClass(navLinks, "active");
        }
    });
}

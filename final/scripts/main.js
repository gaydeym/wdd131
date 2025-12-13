/**
 * @module main
 */

import { renderSpecials } from "./specials.js";
import { setupMenuTabs } from "./menu.js";
import { populateTimeSlots, setupReservationForm } from "./reservation.js";
import { setupMobileNav } from "./navigation.js";

function init() {
    // home page components
    renderSpecials();
    setupMenuTabs();

    // reservation page components
    populateTimeSlots();
    setupReservationForm();

    // navigation
    setupMobileNav();

    console.log("Aurora Bistro application initialized successfully!");
}

document.addEventListener("DOMContentLoaded", init);

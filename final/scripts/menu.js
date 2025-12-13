/**
 * @module menu
 */

import { menuData } from "./data.js";
import { getElement, getElements, addClass, removeClass } from "./utils.js";

/**
 * @param {Object} item
 * @returns {string}
 */

function createMenuItem(item) {
    return `
        <div class="menu-item">
            <div class="item-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
            </div>
            <p class="item-description">${item.description}</p>
        </div>
    `;
}

/**
 * @param {string} category
 */

export function renderMenu(category) {
    const menuContent = getElement("menuContent");

    if (!menuContent || !menuData[category]) return;

    const items = menuData[category];
    const menuHTML = `
        <div class="menu-items">
            ${items.map((item) => createMenuItem(item)).join("")}
        </div>
    `;

    menuContent.innerHTML = menuHTML;
}

export function setupMenuTabs() {
    const tabButtons = getElements(".tab-btn");

    tabButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            tabButtons.forEach((btn) => removeClass(btn, "active"));
            addClass(e.target, "active");
            const category = e.target.getAttribute("data-category");
            renderMenu(category);
        });
    });

    renderMenu("starters");
}

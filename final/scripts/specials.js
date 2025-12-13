/**
 * @module specials
 */

import { specialsData } from "./data.js";
import { getElement } from "./utils.js";

/**
 * @param {Object} special
 * @returns {string}
 */

function createSpecialCard(special) {
    return `
        <div class="special-card">
            <img src="${special.image}" alt="${special.title}" class="special-image" loading="lazy">
            <div class="special-content">
                <h3>${special.title}</h3>
                <p>${special.description}</p>
                <p class="special-price">$${special.price}</p>
            </div>
        </div>
    `;
}

export function renderSpecials() {
    const specialsGrid = getElement("specialsGrid");

    if (!specialsGrid) return;

    const specialsHTML = specialsData
        .map((special) => createSpecialCard(special))
        .join("");

    specialsGrid.innerHTML = specialsHTML;
}

/**
 * @module utils
 */

/**
 * @param {string} email
 * @returns {boolean}
 */

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * @param {string} id
 * @returns {HTMLElement|null}
 */

export function getElement(id) {
    return document.getElementById(id);
}

/**
 * @param {string} selector
 * @returns {NodeList}
 */

export function getElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */

export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */

export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */

export function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * @param {Date} date
 * @returns {string}
 */

export function formatDate(date) {
    return date.toISOString().split("T")[0];
}

/**
 * @returns {string}
 */

export function getTodayDate() {
    return formatDate(new Date());
}

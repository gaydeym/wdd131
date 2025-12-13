/**
 * @module reservation
 */

import { timeSlots, bookings } from "./data.js";
import {
    getElement,
    getElements,
    addClass,
    removeClass,
    isValidEmail,
    getTodayDate,
} from "./utils.js";

export function populateTimeSlots() {
    const timeSelect = getElement("time");

    if (!timeSelect) return;

    timeSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
    });
}

/**
 * @param {string} date
 * @param {string} time
 * @returns {Object}
 */

function checkAvailability(date, time) {
    const dateKey = date;

    if (bookings[dateKey]) {
        if (bookings[dateKey].includes(time)) {
            return {
                available: false,
                message:
                    "This time slot is already booked. Please select another time.",
            };
        }

        const bookedSlots = bookings[dateKey].length;
        const availableSlots = timeSlots.length - bookedSlots;
        return {
            available: true,
            message: `Great choice! ${availableSlots} time slots still available for this date.`,
        };
    }

    return {
        available: true,
        message: "Excellent! This date has full availability.",
    };
}

/**
 * @param {Object} formData
 * @returns {Object}
 */

function validateForm(formData) {
    const errors = {};
    let isValid = true;

    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = "Please enter a valid name (at least 2 characters)";
        isValid = false;
    }

    // Validate email
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
    }

    // Validate phone
    if (!formData.phone || formData.phone.trim().length < 10) {
        errors.phone = "Please enter a valid phone number";
        isValid = false;
    }

    // Validate date
    if (!formData.date) {
        errors.date = "Please select a reservation date";
        isValid = false;
    } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.date = "Please select a future date";
            isValid = false;
        }
    }

    // Validate time
    if (!formData.time) {
        errors.time = "Please select a time";
        isValid = false;
    }

    // Validate guests
    if (!formData.guests) {
        errors.guests = "Please select number of guests";
        isValid = false;
    }

    return { isValid, errors };
}

/**
 * @param {Object} errors
 */

function displayErrors(errors) {
    // Clear all previous errors
    getElements(".error-message").forEach((el) => {
        removeClass(el, "show");
        el.textContent = "";
    });

    getElements(".form-group input, .form-group select").forEach((el) => {
        removeClass(el, "error");
    });

    // Display new errors
    Object.keys(errors).forEach((field) => {
        const errorElement = getElement(`${field}Error`);
        const inputElement = getElement(field);

        if (errorElement && inputElement) {
            errorElement.textContent = errors[field];
            addClass(errorElement, "show");
            addClass(inputElement, "error");
        }
    });
}

/**
 * @param {Object} data
 */

function showConfirmation(data) {
    const form = getElement("reservationForm");
    const confirmationMessage = getElement("confirmationMessage");
    const confirmationDetails = getElement("confirmationDetails");

    if (!form || !confirmationMessage || !confirmationDetails) return;

    form.style.display = "none";

    const occasionText = data.occasion
        ? `<p><strong>Occasion:</strong> ${data.occasion}</p>`
        : "";
    const requestsText = data.requests
        ? `<p><strong>Special Requests:</strong> ${data.requests}</p>`
        : "";

    confirmationDetails.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Number of Guests:</strong> ${data.guests}</p>
        ${occasionText}
        ${requestsText}
        <p style="margin-top: 1rem; font-style: italic;">We look forward to serving you!</p>
    `;

    confirmationMessage.style.display = "block";
}

export function setupReservationForm() {
    const form = getElement("reservationForm");
    const dateInput = getElement("date");
    const timeInput = getElement("time");
    const availabilityInfo = getElement("availabilityInfo");

    if (!form) return;

    // Set minimum date to today
    if (dateInput) {
        dateInput.setAttribute("min", getTodayDate());
    }

    // Check availability when date or time changes
    const checkSlotAvailability = () => {
        const date = dateInput.value;
        const time = timeInput.value;

        if (date && time) {
            const availability = checkAvailability(date, time);

            if (availabilityInfo) {
                availabilityInfo.textContent = availability.message;
                addClass(availabilityInfo, "show");

                if (!availability.available) {
                    addClass(availabilityInfo, "warning");
                } else {
                    removeClass(availabilityInfo, "warning");
                }
            }
        }
    };

    dateInput?.addEventListener("change", checkSlotAvailability);
    timeInput?.addEventListener("change", checkSlotAvailability);

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {
            name: getElement("name").value,
            email: getElement("email").value,
            phone: getElement("phone").value,
            date: getElement("date").value,
            time: getElement("time").value,
            guests: getElement("guests").value,
            occasion: getElement("occasion").value,
            requests: getElement("requests").value,
        };

        const validation = validateForm(formData);

        if (!validation.isValid) {
            displayErrors(validation.errors);
            return;
        }

        const availability = checkAvailability(formData.date, formData.time);

        if (!availability.available) {
            alert(availability.message);
            return;
        }

        // Store booking
        if (!bookings[formData.date]) {
            bookings[formData.date] = [];
        }
        bookings[formData.date].push(formData.time);

        showConfirmation(formData);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("header button");
    const navUl = document.querySelector("header ul");

    if (menuButton && navUl) {
        menuButton.addEventListener("click", () => {
            navUl.classList.toggle("open");
        });
    }
});

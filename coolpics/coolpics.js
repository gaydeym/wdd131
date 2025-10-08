document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("header button");
    const navUl = document.querySelector("header ul");

    if (menuButton && navUl) {
        menuButton.addEventListener("click", () => {
            navUl.classList.toggle("open");
        });
    }

    const gallery = document.querySelector(".gallery");

    if (gallery) {
        gallery.addEventListener("click", handleGalleryClick);
    }

    function handleGalleryClick(event) {
        const clickedImg = event.target.closest("img");
        if (!clickedImg) return;

        const src = clickedImg.src;
        const alt = clickedImg.alt;

        const fullSrc = src.split("-")[0] + "-full.jpeg";
        const dialog = document.createElement("dialog");

        dialog.innerHTML = `
            <img src="${fullSrc}" alt="${alt}">
            <button class="close-viewer">X</button>
        `;

        document.body.appendChild(dialog);

        dialog.showModal();

        const closeButton = dialog.querySelector(".close-viewer");
        closeButton.addEventListener("click", () => {
            dialog.close();
            dialog.remove();
        });

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
                dialog.remove();
            }
        });
    }
});

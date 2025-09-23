const themeSelector = document.querySelector('#theme-select');
const logo = document.querySelector('.logo');

function changeTheme() {
    const value = themeSelector.value;

    if (value === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'byui-logo_dark.png';
    } else {
        document.body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
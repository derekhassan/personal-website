const navBtnToggle = document.querySelector('.nav__toggle');
const navBtnIcon = document.querySelector('.nav__toggle i');

const closeIconClass = 'ri-close-line';
const menuIconClass = 'ri-menu-line';

navBtnToggle.addEventListener('click', () => {
    const currentStatus = navBtnToggle.getAttribute('aria-expanded');
    navBtnToggle.setAttribute(
        'aria-expanded',
        currentStatus === 'true' ? 'false' : 'true'
    );
    navBtnIcon.classList.remove(
        currentStatus === 'true' ? closeIconClass : menuIconClass
    );
    navBtnIcon.classList.add(
        currentStatus === 'true' ? menuIconClass : closeIconClass
    );
});

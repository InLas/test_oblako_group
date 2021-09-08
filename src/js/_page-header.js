const mainNav = document.querySelector('.main-nav');
const burgerMenu = document.querySelector('.controls__btn--burger');
const pageHeader = document.querySelector('.page-header');

if (mainNav) {
  mainNav.classList.remove('main-nav--no-js');

  burgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('main-nav--closed');
  });


  window.addEventListener('scroll', function () {
    if (this.pageYOffset > 0) {
      pageHeader.classList.add('page-header--scroll');
    } else {
      pageHeader.classList.remove('page-header--scroll');
    }
  });
}
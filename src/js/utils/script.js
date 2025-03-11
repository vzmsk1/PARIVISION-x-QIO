import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export const mm = gsap.matchMedia();

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  const onClickHandler = e => {};

  document.addEventListener('click', onClickHandler);
});
window.addEventListener('load', function () {
  document.documentElement.classList.add('_page-loaded');

  ScrollTrigger.refresh();

  window.scrollTo(0, 0);
});

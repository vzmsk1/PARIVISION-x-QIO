import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { initHomepageAnim, itemsTl, setProps } from '../anim/homepage';
import { initWatchTimer } from './utils';

if (document.querySelector('.hero')) {
  document.querySelector('body').style.opacity = 0;

  setProps();
}

export const mm = gsap.matchMedia();

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  const onClickHandler = e => {
    if (e.target.closest('.header__menu-btn')) {
      document.documentElement.classList.add('_show-menu');
    }
    if (
      e.target.closest('._show-menu') &&
      (e.target.closest('.menu__close-btn') || !e.target.closest('.menu')) &&
      !e.target.closest('.header__menu-btn')
    ) {
      document.documentElement.classList.remove('_show-menu');
    }
  };

  document.addEventListener('click', onClickHandler);
});
window.addEventListener('load', function () {
  document.querySelector('body').style.opacity = 1;

  document.documentElement.classList.add('_page-loaded');

  ScrollTrigger.refresh();

  // window.scrollTo(0, 0);

  if (document.querySelector('.hero')) {
    initHomepageAnim();
  }

  initWatchTimer();
});

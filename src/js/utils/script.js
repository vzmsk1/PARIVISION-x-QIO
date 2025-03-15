import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { initHomepageAnim, itemsTl } from '../anim/homepage';
import { initWatchTimer, isTouchDevice } from './utils';
import { sections } from '../anim/homepage-scroll';
import { lenis } from '../lib/lenis';

export const mm = gsap.matchMedia();
export const md = window.matchMedia('(max-width: 49em)');
export const isTouch = isTouchDevice();

const checkScreenSize = () => {
  const div = md.matches ? 0.6 : 2;

  if (window.screen.availWidth / window.screen.availHeight >= div) {
    document.documentElement.classList.add('_hf');
  } else {
    document.documentElement.classList.remove('_hf');
  }
};

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

    if (
      document.querySelector('.homepage-table__list._is-active') &&
      !e.target.closest('.homepage-table__list')
    ) {
      document
        .querySelector('.homepage-table__list')
        .classList.remove('_is-active');
      itemsTl.reverse();
    }
  };

  document.addEventListener('click', onClickHandler);
});

window.addEventListener('load', function () {
  document.documentElement.classList.add('_page-loaded');

  ScrollTrigger.refresh();

  // window.scrollTo(0, 0);

  if (document.querySelector('.hero')) {
    lenis.destroy();

    initHomepageAnim();
    checkScreenSize();

    if (sections.length) {
      for (let i = 0; i < sections.length; i++) {
        const bullet = document.createElement('span');

        bullet.classList.add('homepage-table__bullet');
        document.querySelector('.homepage-table__bullets').append(bullet);

        if (i === 0) bullet.classList.add('_is-active');
      }
    }

    window.addEventListener('resize', checkScreenSize);
  }

  initWatchTimer();
});

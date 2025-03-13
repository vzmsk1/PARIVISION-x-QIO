import gsap from 'gsap';
import { ACTIVE_CLASS, resetActiveSection } from './homepage-scroll';
import { isTouch } from '../utils/script';
import { tlMain } from './timelines';

const list = document.querySelector('.homepage-table__list');

export const itemsTl = gsap
  .timeline({ paused: true })
  .to('.homepage-table__list-item', {
    '--mb': '2rem',
    '--opacity': 1,
    '--scale': 1,
    duration: 0.5,
    stagger: 0.3,
  });

export const initItemsAnim = () => {
  list.addEventListener('click', function () {
    if (isTouch) {
      list.classList.toggle('_is-active');

      if (!list.classList.contains('_is-active')) {
        itemsTl.reverse();
      } else {
        itemsTl.play();
      }
    }
  });

  list.addEventListener('mouseover', function () {
    if (!isTouch) itemsTl.play();
  });
  list.addEventListener('mouseout', function () {
    if (!isTouch) itemsTl.reverse();
  });
};

export const initHomepageAnim = () => {
  document.documentElement.classList.add('homepage');

  gsap.timeline().to('.homepage-table', { opacity: 1 }).to(
    '.homepage-table',
    {
      filter: 'blur(0rem)',
    },
    0.8
  );
  tlMain.play();

  document.querySelector('[data-section]').classList.add(ACTIVE_CLASS);
  resetActiveSection(document.querySelector('[data-section]'));
};

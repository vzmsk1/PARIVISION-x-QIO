import gsap from 'gsap';
import { ACTIVE_CLASS, resetActiveSection } from './homepage-scroll';
import { isTouch } from '../utils/script';
import { tlLeadersLeave, tlMain } from './timelines';
import { Observer } from 'gsap/all';
import { removeClasses } from '../utils/utils';

export const list = document.querySelector('.homepage-table__list');
export const headings = gsap.utils.toArray('.leaders__group-heading');

export const initLeadersScreenObserver = (self, leaders, leadersIdx) => {
  self.disable();

  leaders[leadersIdx] && leaders[leadersIdx].classList.add('_is-visible');
  if (headings[leadersIdx]) {
    removeClasses(headings, '_is-active');
    headings[leadersIdx].classList.add('_is-active');
  }
  if (isTouch && leadersIdx !== 0) {
    gsap.to('.leaders__group_center', { opacity: 0, translateY: '8rem' });
  } else {
    gsap.to('.leaders__group_center', { opacity: 1, translateY: 0 });
  }

  setTimeout(() => {
    self.enable();
  }, 1000);
};

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

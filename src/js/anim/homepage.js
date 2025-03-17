import gsap from 'gsap';
import { isTouch } from '../utils/script';
import { removeClasses } from '../utils/utils';

export const list = document.querySelector('.homepage-table__list');
export const headings = gsap.utils.toArray('.leaders__group-heading');

export const initLeadersScreenObserver = (self, leaders, leadersIdx) => {
  self.disable();
  document.documentElement.classList.add('_is-animating');

  leaders[leadersIdx] && leaders[leadersIdx].classList.add('_is-visible');
  if (headings[leadersIdx]) {
    removeClasses(headings, '_is-active');
    headings[leadersIdx].classList.add('_is-active');
  }
  if (isTouch && leadersIdx !== 0) {
    gsap.to('#homepage-video-2 video', { opacity: 0, translateY: '8rem' });
  } else {
    gsap.to('#homepage-video-2 video', { opacity: 1, translateY: 0 });
  }

  setTimeout(() => {
    self.enable();
    document.documentElement.classList.remove('_is-animating');
  }, 1000);
};

export const itemsTl = gsap
  .timeline({ paused: true })
  .to('.homepage-table__list-item', {
    '--mb': '2rem',
    '--opacity': 1,
    '--scale': 1,
    duration: 0.3,
    stagger: 0.2,
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

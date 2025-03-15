import gsap from 'gsap';
import { Observer } from 'gsap/all';
import { isTouchDevice, removeClasses } from '../utils/utils';
import { timelines } from './timelines';
import { headings, initLeadersScreenObserver } from './homepage';

gsap.registerPlugin(Observer);

const isTouch = isTouchDevice();

export const ANIMATING_CLASS = '_is-animating';
export const ACTIVE_CLASS = '_is-active';
export const INIT_SCROLL_CLASS = '_init-scroll';

let yPos = 0;
let leadersIdx = 0;

const leaders = gsap.utils.toArray('.leaders__group');
const table = document.querySelector('.homepage-table');
const heading = document.getElementById('section-heading');
export const sections = gsap.utils.toArray('[data-section]');

const scroll = (self, i, deltaY) => {
  if (
    !document.querySelector(`.${ANIMATING_CLASS}`) &&
    document.querySelector(`.${INIT_SCROLL_CLASS}`)
  ) {
    self.disable();

    const prev = sections[i - 1];
    const next = sections[i + 1];
    const target = deltaY === 1 ? next : prev;

    resetActiveSection(target, deltaY);
  }
};

const down = self => {
  const activeIdx = sections.indexOf(
    document.querySelector(`[data-section].${ACTIVE_CLASS}`)
  );
  const next = sections[activeIdx + 1];

  if (next) {
    if (sections[activeIdx].dataset.section !== 'leaders') {
      scroll(self, activeIdx, 1);
    } else {
      leadersIdx = leaders[leadersIdx + 1] ? leadersIdx + 1 : 0;

      if (
        leadersIdx !== 0 &&
        !headings[headings.length - 1].classList.contains('_is-active')
      ) {
        initLeadersScreenObserver(self, leaders, leadersIdx);
      } else if (
        headings[headings.length - 1].classList.contains('_is-active')
      ) {
        document.documentElement.classList.remove('leaders-screen');
        scroll(self, activeIdx, 1);
      }
    }
  }
};
const up = self => {
  const activeIdx = sections.indexOf(
    document.querySelector(`[data-section].${ACTIVE_CLASS}`)
  );
  const next = sections[activeIdx - 1];

  if (next) {
    if (
      sections[activeIdx].dataset.section !== 'leaders' ||
      leaders[0].classList.contains('_is-active')
    ) {
      scroll(self, activeIdx, -1);
    } else {
      leadersIdx = headings.indexOf(
        document.querySelector('.leaders__group-heading._is-active')
      );
      leadersIdx -= 1;

      if (leadersIdx !== -1) {
        initLeadersScreenObserver(self, leaders, leadersIdx);
      } else {
        document.documentElement.classList.remove('leaders-screen');
        scroll(self, activeIdx, -1);
      }
    }
  }
};

export const observer = Observer.create({
  target: '.homepage',
  type: 'wheel,touch',
  wheelSpeed: isTouch ? -1 : 1,
  onUp: self => {
    if (
      !self.event.target.closest('.menu') &&
      !self.event.target.closest('.news__filters')
    ) {
      if (isTouch) {
        down(self);
      } else {
        up(self);
      }
    }
  },
  onDown: self => {
    if (
      !self.event.target.closest('.menu') &&
      !self.event.target.closest('.news__filters')
    ) {
      if (isTouch) {
        up(self);
      } else {
        down(self);
      }
    }
  },
});
observer.disable();

export const resetActiveSection = (section, deltaY = -1) => {
  const bullets = gsap.utils.toArray('.homepage-table__bullet');

  if (section) {
    const curIdx = sections.indexOf(section);
    const curBullet = bullets[curIdx];
    const prevIdx = deltaY === 1 ? curIdx - 1 : curIdx + 1;

    const transition = prevTl => {
      const tl = timelines.filter(tl => tl.vars.id === `${curIdx}-on`)[0];
      removeClasses(sections, ACTIVE_CLASS);
      sections[curIdx].classList.add(ACTIVE_CLASS);
      if (tl) {
        tl.restart(true);
      }
      prevTl.revert();
    };
    if (prevIdx >= 0 && document.querySelector(`.${INIT_SCROLL_CLASS}`)) {
      const curTl = timelines.filter(tl => tl.vars.id === `${prevIdx}-off`)[0];

      curTl.restart();
      curTl.then(() => {
        transition(curTl);
      });
    }

    document.documentElement.classList.add(ANIMATING_CLASS);

    yPos = deltaY === 1 ? yPos + 16 : yPos - 16;

    gsap.to('body', { '--y': `${yPos}rem`, duration: 2 });

    if (table) {
      if (
        !section.classList.contains('hero') &&
        !section.classList.contains('about') &&
        !section.classList.contains('team')
      ) {
        gsap.to('body', { '--opacity': 0 });
      } else {
        gsap.to('body', { '--opacity': 1 });
      }
    }
    console.log(curBullet);
    if (bullets.length && curBullet) {
      removeClasses(bullets, ACTIVE_CLASS);
      curBullet.classList.add(ACTIVE_CLASS);
    }

    if (heading) {
      heading.innerHTML = section.dataset.section;
    }
  }
};

export const initHomepageScroll = () => {
  document.documentElement.classList.add(INIT_SCROLL_CLASS);

  observer.enable();
};

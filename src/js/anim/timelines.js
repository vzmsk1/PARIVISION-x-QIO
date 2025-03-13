import gsap from 'gsap';
import { initItemsAnim, itemsTl } from './homepage';
import {
  ACTIVE_CLASS,
  ANIMATING_CLASS,
  INIT_SCROLL_CLASS,
  initHomepageScroll,
  observer,
  sections,
} from './homepage-scroll';
import { removeClasses } from '../utils/utils';

const sectionMain = document.querySelector('[data-section="main"]');
const sectionAbout = document.querySelector('[data-section="about"]');

const clearedProps = {
  opacity: 1,
  translateY: 0,
  filter: 'blur(0rem)',
};
const blurTopProps = {
  opacity: 0,
  filter: 'blur(0.3rem)',
  translateY: '-14rem',
};

const onDefaults = {
  duration: 0.5,
  paused: true,
  onComplete: () => {
    document.documentElement.classList.remove(ANIMATING_CLASS);
    observer.enable();
  },
};
const offDefaults = {
  duration: 0.5,
  paused: true,
  onStart: () => {
    document.documentElement.classList.add(ANIMATING_CLASS);
    observer.disable();
  },
};

export const tlMain = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionMain)}-on`,
});
export const tlMainLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionMain)}-off`,
});
tlMain.to('.hero__container', {
  duration: 1.5,
  ...clearedProps,
  onComplete: () => {
    if (!document.querySelector(`.${INIT_SCROLL_CLASS}`)) {
      itemsTl.play();
      itemsTl.then(() => {
        initHomepageScroll();

        setTimeout(() => {
          itemsTl.reverse();
          itemsTl.then(initItemsAnim);
        }, 3000);
      });
    }
  },
});
tlMainLeave.to('.hero__container', blurTopProps);

export const tlAbout = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionAbout)}-on`,
});
export const tlAboutLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionAbout)}-off`,
});
tlAbout
  .to('.about__heading-txt:first-child, .about__heading-txt:nth-child(2)', {
    ...clearedProps,
    duration: 1.5,
  })
  .to(
    '.about__text-wrap',
    clearedProps,

    0
  )
  .to(
    '.about__heading-txt:nth-child(3), .about__heading-txt:nth-child(4)',
    {
      ...clearedProps,
      stagger: 0.3,
    },
    0.8
  );
tlAboutLeave.to('.about__container', blurTopProps);

export const timelines = [tlMain, tlMainLeave, tlAbout, tlAboutLeave];

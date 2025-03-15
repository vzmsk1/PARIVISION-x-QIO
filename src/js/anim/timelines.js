import gsap from 'gsap';
import { initItemsAnim, itemsTl } from './homepage';
import {
  ACTIVE_CLASS,
  ANIMATING_CLASS,
  INIT_SCROLL_CLASS,
  initHomepageScroll,
  observer,
  resetActiveSection,
  sections,
} from './homepage-scroll';
import videojs from 'video.js';
import { defaults } from 'lodash';

export const duration = 1.5;

const preloaderVideo = videojs.getPlayer(
  document.querySelector('.preloader [data-videojs]')
);
const video1 = document.getElementById('homepage-video-1');
const table = document.querySelector('.homepage-table');
const sectionMain = document.querySelector('[data-section="main"]');
const sectionAbout = document.querySelector('[data-section="about"]');
const sectionTeam = document.querySelector('[data-section="team"]');
const sectionLeaders = document.querySelector('[data-section="leaders"]');
const sectionTeams = document.querySelector('[data-section="teams"]');
const sectionNews = document.querySelector('[data-section="news"]');
const sectionContacts = document.querySelector('[data-section="contacts"]');
const sectionLinks = document.querySelector('[data-section="links"]');

const clearedProps = {
  opacity: 1,
  translateY: 0,
  filter: 'blur(0rem)',
};
const blurTopProps = {
  opacity: 0,
  filter: 'blur(1rem)',
  translateY: '-10%',
};
const opacityTopProps = {
  opacity: 0,
  translateY: '-10%',
};

const onDefaults = {
  defaults: {
    duration: 1.5,
    ease: 'circ.inOut',
  },
  paused: true,
  onComplete: () => {
    document.documentElement.classList.remove(ANIMATING_CLASS);
    observer.enable();
  },
};
const offDefaults = {
  defaults: onDefaults.defaults,
  paused: true,
  onStart: () => {
    document.documentElement.classList.add(ANIMATING_CLASS);
    observer.disable();
  },
};

export const tlPreloader = gsap.timeline({
  paused: true,
  defaults: onDefaults.defaults,
});
export const tlPreloaderLeave = gsap.timeline({
  ...offDefaults,
});
const hideLoader = () => {
  document.querySelectorAll('.preloader__progress') &&
    document.querySelectorAll('.preloader__progress').forEach(el => {
      el.textContent = 100;
    });
  tlPreloaderLeave.play();
};
tlPreloader
  .to(
    'html',
    {
      '--opacity': 1,
      duration,
    },
    0
  )
  .to(
    '.preloader',
    {
      opacity: 1,
      duration,
    },
    0
  )
  .to(
    '.preloader',
    {
      '--y': 0,
      '--opacity': 1,
      '--blur': '0rem',
      duration,
      onStart: () => {
        gsap.from('.preloader__progress', {
          textContent: 0,
          duration: 3,
          snap: { textContent: 1 },
          onComplete: () => {
            if (document.querySelector('._page-loaded')) {
              hideLoader();
            } else {
              window.addEventListener('load', hideLoader);
            }
          },
        });
      },
      onComplete: () => {
        preloaderVideo && preloaderVideo.play();
      },
    },
    0.5
  );
tlPreloaderLeave.to('.preloader__video, #loader', {
  opacity: 0,
  duration: 0.5,
  onStart: () => {
    gsap.to('.homepage-table, .header', { opacity: 1 });
    gsap.to('.homepage-table, .header', {
      filter: 'blur(0rem)',
      delay: 0.5,
      onComplete: () => {
        gsap.to('.header__heading', { opacity: 1 });

        document.querySelector('[data-section]').classList.add(ACTIVE_CLASS);
        resetActiveSection(document.querySelector('[data-section]'));

        tlMain.play();
      },
    });
  },
  onComplete: () => {
    preloaderVideo && preloaderVideo.pause();

    document.getElementById('loader').style.display = 'none';
  },
});

export const tlMain = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionMain)}-on`,
});
export const tlMainLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionMain)}-off`,
});
tlMain
  .to('.hero__container', {
    ...clearedProps,
    onComplete: () => {
      if (!document.querySelector(`.${INIT_SCROLL_CLASS}`)) {
        itemsTl.play();
        itemsTl.then(() => {
          initHomepageScroll();

          setTimeout(() => {
            itemsTl.reverse();
            itemsTl.then(initItemsAnim);
          }, 2000);
        });
      }
    },
  })
  .to('body', { '--opacity': 1 }, 0);
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
    duration: 1,
    opacity: 1,
    translateY: 0,
  })
  .to(
    '.about__heading-txt:first-child, .about__heading-txt:nth-child(2)',
    {
      filter: 'blur(0rem)',
      duration: 1,
    },
    0.5
  )
  .to(
    '.about__text-wrap',
    clearedProps,

    0
  )
  .to(
    '.about__heading-txt:nth-child(3), .about__heading-txt:nth-child(4)',
    {
      duration: 1,
      opacity: 1,
      translateY: 0,
      stagger: 0.1,
    },
    0.5
  )
  .to(
    '.about__heading-txt:nth-child(3), .about__heading-txt:nth-child(4)',
    {
      filter: 'blur(0rem)',
      duration: 1,
      stagger: 0.2,
    },
    1
  )
  .to(
    '#homepage-video-1 video',
    {
      opacity: 1,
    },
    0.7
  )
  .to(
    'html',
    {
      '--opacity': 0,
    },
    0.7
  );
tlAboutLeave.to('.about__heading, .about__text-wrap', {
  ...blurTopProps,
  onStart: () => {
    videojs.getPlayer(video1) && videojs.getPlayer(video1).play();
  },
});

export const tlTeam = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionTeam)}-on`,
});
export const tlTeamLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionTeam)}-off`,
});
tlTeam
  .to('.team__heading span', {
    opacity: 1,
    translateY: 0,
    duration: 1,
    stagger: 0.1,
  })
  .to(
    '.team__heading span',
    { filter: 'blur(0rem)', stagger: 0.1, duration: 1 },
    0.3
  )
  .to('.team__txt', clearedProps, 0);
tlTeamLeave
  .to('.team__heading span', blurTopProps)
  .to('.team__txt', opacityTopProps, 0);

export const tlLeaders = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionLeaders)}-on`,
});
export const tlLeadersLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionLeaders)}-off`,
});
tlLeaders.to('.leaders__container, .leaders__group_center', {
  ...clearedProps,
  onStart: () => {
    document.documentElement.classList.add('leaders-screen');

    table && table.classList.add('_leaders-btn');

    if (!document.querySelector('.leaders__group._is-visible')) {
      document
        .querySelector('.leaders__group-heading_main')
        .classList.add('_is-active');
    }
  },
});
tlLeadersLeave.to('.leaders__container', {
  opacity: 0,
  onComplete: () => {
    table && table.classList.remove('_leaders-btn');
  },
});

export const tlTeams = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionTeams)}-on`,
});
export const tlTeamsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionTeams)}-off`,
});
tlTeams
  .to('.teams__item', {
    ...clearedProps,
    stagger: 0.3,
    onStart: () => {
      table && table.classList.add('_teams-btn');
    },
  })
  .to('.item-teams__logo', {
    scaleY: 1,
    stagger: 0.3,
  });
tlTeamsLeave.to('.teams__container', {
  opacity: 0,
  onComplete: () => {
    table && table.classList.remove('_teams-btn');
  },
});

export const tlNews = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionNews)}-on`,
});
export const tlNewsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionNews)}-off`,
});
tlNews.to('.news__container', {
  ...clearedProps,
  onStart: () => {
    table && table.classList.add('_news-btn');
  },
});
tlNewsLeave.to('.news__container', {
  opacity: 0,
  onComplete: () => {
    table && table.classList.remove('_news-btn');
  },
});

export const tlContacts = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionContacts)}-on`,
});
export const tlContactsLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionContacts)}-off`,
});
tlContacts.to('.news__container', {
  ...clearedProps,
  onStart: () => {
    table && table.classList.add('_contacts-btn');
  },
});
tlContactsLeave.to('.news__container', {
  opacity: 0,
  onComplete: () => {
    table && table.classList.remove('_contacts-btn');
  },
});

export const tlLinks = gsap.timeline({
  ...onDefaults,
  id: `${sections.indexOf(sectionLinks)}-on`,
});
export const tlLinksLeave = gsap.timeline({
  ...offDefaults,
  id: `${sections.indexOf(sectionLinks)}-off`,
});
tlLinks.to('.links__container', {
  ...clearedProps,
  onStart: () => {
    table && table.classList.add('_is-hidden');
  },
});
tlLinksLeave.to('.links__container', {
  opacity: 0,
  onComplete: () => {
    table && table.classList.remove('_is-hidden');
  },
});

export const timelines = [
  tlMain,
  tlMainLeave,
  tlAbout,
  tlAboutLeave,
  tlTeam,
  tlTeamLeave,
  tlLeaders,
  tlLeadersLeave,
  tlTeams,
  tlTeamsLeave,
  tlNews,
  tlNewsLeave,
  tlContacts,
  tlContactsLeave,
  tlLinks,
  tlLinksLeave,
];

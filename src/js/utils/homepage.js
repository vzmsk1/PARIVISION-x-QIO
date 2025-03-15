import { sections } from '../anim/homepage-scroll';
import { md } from './script';

export const checkScreenSize = () => {
  const div = md.matches ? 0.6 : 2;

  if (window.screen.availWidth / window.screen.availHeight >= div) {
    document.documentElement.classList.add('_hf');
  } else {
    document.documentElement.classList.remove('_hf');
  }
};
export const initHomepageBullets = () => {
  if (sections.length) {
    for (let i = 0; i < sections.length; i++) {
      const bullet = document.createElement('span');

      bullet.classList.add('homepage-table__bullet');
      document.querySelector('.homepage-table__bullets').append(bullet);

      if (i === 0) bullet.classList.add('_is-active');
    }
  }
};

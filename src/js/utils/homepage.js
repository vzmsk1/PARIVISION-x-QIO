import { sections } from '../anim/homepage-scroll';
import { md } from './script';

export const checkScreenSize = () => {
  const x = md.matches ? 2.16744186 : 2;
  const s = 1.76146789;
  const l = 0.749633968;
  const width = window.screen.availWidth;
  const height = window.screen.availHeight;

  if (
    (md.matches && height / width <= x) ||
    (!md.matches && width / height >= x)
  ) {
    document.documentElement.classList.add('_hf');
  } else {
    document.documentElement.classList.remove('_hf');
  }

  // if (!md.matches && width / height <= l) {
  //   document.documentElement.classList.add('_l-screen');
  // } else {
  //   document.documentElement.classList.remove('_l-screen');
  // }

  if (width / height >= s && width / height < x) {
    document.documentElement.classList.add('_small-screen');
  } else {
    document.documentElement.classList.remove('_small-screen');
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

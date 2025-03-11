import gsap from 'gsap';

export const itemsTl = gsap
  .timeline({ paused: true })
  .to('.homepage-table__list-item', {
    '--mb': '2rem',
    '--opacity': 1,
    '--scale': 1,
    duration: 0.5,
    stagger: 0.3,
  });

export const setProps = () => {
  gsap.set('.homepage-table', { filter: 'blur(0.3rem)', opacity: 0 });
  gsap.set('.hero__container', {
    opacity: 0,
    filter: 'blur(0.3rem)',
  });
};

export const initHomepageAnim = () => {
  document.documentElement.classList.add('homepage');

  const list = document.querySelector('.homepage-table__list');

  const tl = gsap.timeline({ duration: 0.5 });

  tl.to('.homepage-table', { opacity: 1 })
    .to(
      '.homepage-table',
      {
        filter: 'blur(0rem)',
      },
      0.8
    )
    .to('body', {
      '--y': '-16rem',
      duration: 1.5,
      onStart: () => {
        gsap.to('.hero__container', {
          opacity: 1,
          translateY: 0,
          duration: 1.5,
          filter: 'blur(0rem)',
          onComplete: () => {
            itemsTl.play();
            itemsTl.then(
              setTimeout(() => {
                itemsTl.reverse();
                itemsTl.then(() => {
                  list.addEventListener('mouseover', function () {
                    itemsTl.play();
                  });
                  list.addEventListener('mouseout', function () {
                    itemsTl.reverse();
                  });
                });
              }, 3000)
            );
          },
        });
      },
    });

  if (document.querySelector('.homepage-table__bullet')) {
    document
      .querySelector('.homepage-table__bullet')
      .classList.add('_is-active');
  }
};

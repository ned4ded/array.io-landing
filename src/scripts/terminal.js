document.addEventListener('DOMContentLoaded', (() => {
  document.querySelector('html').classList.remove('no-js');

  const pairs = Array.from( document.querySelectorAll('[data-toggle]') ).map(toggler => {
    const ids = JSON.parse(toggler.dataset.toggle);

    const togglees = ids.map(i => document.getElementById(i));

    return { toggler, togglees };
  });

  const toggle = (el) => {
    if(el.dataset.visible == 'true') {
      el.dataset.visible = false;

      return;
    }

    el.dataset.visible = true;

    return;
  }

  pairs.forEach(({ toggler, togglees }) => {
    toggler.addEventListener('click', (ev) => {
      ev.preventDefault();

      togglees.forEach(toggle);

      return;
    });
  });

  const instruction = document.getElementById('instruction-steps');
  const prev = document.getElementById('instruction-steps-prev');
  const next = document.getElementById('instruction-steps-next');

  const options = {
    simulateTouch: false,
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: prev,
      nextEl: next,
    }
  }

  const swiper = (() => {
    return instruction ? new Swiper(instruction, options) : null;
  })();


}), false);

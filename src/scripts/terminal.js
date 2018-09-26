document.addEventListener('DOMContentLoaded', (() => {

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

}), false);;

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

  class ModalWindow {
    constructor(element, lining, timeline = 500) {
      this.el = element;
      this.lining = lining;
      this.timeline = timeline;
      this.busy = false;

      this.setState('closed');
    }

    setState(state) {
      switch (state) {
        case 'open':
          this.state = 'open';
          break;
        case 'closed':
          this.state = 'closed';
          break;
        case 'opening':
          this.state = 'opening';
          break;
        case 'closing':
          this.state = 'closing';
          break;
        default:
          return new Error('ModalWindow: Wrong State');
      }

      this.notify();

      return this;
    }

    notify() {
      this.el.dataset.modalState = this.state;
      this.lining.dataset.modalState = this.state;
    }

    getState() {
      return this.state;
    }

    isState(state) {
      return this.getState() === state;
    }

    open(cb = () => {}) {
      if(this.isState('open') || this.isBusy()) return false;

      this.occupy();
      this.setState('opening');

      setTimeout(() => {
        this.setState('open');
        this.vacate();

        return cb();
      }, this.timeline);

      return this;
    }

    close(cb = () => {}) {
      if(this.isState('closed') || this.isBusy()) return false;

      this.occupy();
      this.setState('closing');

      setTimeout(() => {
        this.setState('closed');
        this.vacate();

        return cb();
      }, this.timeline);

      return this;
    }

    isBusy() {
      return !!this.busy;
    }

    occupy() {
      this.busy = true;
    }

    vacate() {
      this.busy = false;
    }
  }

  const lining = document.getElementById('lining');

  const modals = Array.from( document.querySelectorAll('[data-modal-toggler]') ).map(el => {
    const id = el.dataset.modalToggler;
    const modal = document.getElementById(id);

    return modal ? { toggler: el, modal: new ModalWindow(modal, lining) } : null;
  });

  modals.forEach(({ toggler, modal }) => {
    const listener = (ev) => {
      ev.preventDefault();

      toggler.removeEventListener('click', listener);

      modal.open(() => {
        lining.addEventListener('click', liningListener);

        return;
      });

    }

    const liningListener = (ev) => {
      console.log('lining');

      ev.preventDefault();

      lining.removeEventListener('click', liningListener);

      modal.close(() => {
        toggler.addEventListener('click', listener);

        return;
      })
    }

    toggler.addEventListener('click', listener);
  });


}), false);

document.addEventListener('DOMContentLoaded', (() => {
  document.querySelector('html').classList.remove('no-js');

  const pairs = Array.from( document.querySelectorAll('[data-toggle-on]') ).map(toggler => {
    const onIds = toggler.dataset.toggleOn ? JSON.parse(toggler.dataset.toggleOn) : [];
    const offIds = toggler.dataset.toggleOff ? JSON.parse(toggler.dataset.toggleOff) : [];

    return { toggler, on: onIds.map(i => document.getElementById(i)), off: offIds.map(i => document.getElementById(i)) };
  });

  const toggle = function (cb, el) {
    el.dataset.visible = true;

    if(el.getAttribute('id') == 'ido-more') {
      anime({
        targets: el,
        opacity: [0, 1],
        height: [0, 350],
        duration: 500,
        easing: 'linear',
        complete: function(anim) {
          cb();
        }
      })
    } else {
      anime({
        targets: el,
        opacity: [0, 1],
        duration: 500,
        easing: 'linear',
        complete: function(anim) {
          cb();
        }
      })
    }

    return;
  }

  pairs.forEach(({ toggler, on, off }) => {
    const handler = (ev) => {
      ev.preventDefault();

      toggler.removeEventListener('click', handler);

      anime({
        targets: toggler,
        opacity: [1, 0],
        duration: 500,
        easing: 'linear',
        height: (toggler.getAttribute('id') == 'ido-more') ? [350, 0] : null,
        complete: function(anim) {
          toggler.dataset.visible = false;

          const listener = () => {
            toggler.addEventListener('click', handler);
          };

          on.forEach(toggle.bind(null, listener));
        }
      })

      off.forEach(e => anime({
        targets: e,
        opacity: [1, 0],
        duration: 500,
        easing: 'linear',
        complete: function(anim) {
          e.dataset.visible = false;
        }
      }))

      return;
    };

    toggler.addEventListener('click', handler);
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

    listener = (ev) => {
      ev.preventDefault();

      return;
    }

    open(cb = () => {}) {
      if(this.isState('open') || this.isBusy()) return false;

      window.addEventListener('touchmove', this.listener);
      window.addEventListener('wheel', this.listener);
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

        window.removeEventListener('touchmove', this.listener);
        window.removeEventListener('wheel', this.listener);

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
      ev.preventDefault();

      lining.removeEventListener('click', liningListener);

      modal.close(() => {
        toggler.addEventListener('click', listener);

        return;
      })
    }

    toggler.addEventListener('click', listener);
  });

  class Animation {
    constructor(el, openTime = 500) {
      this.el = el;
      this.openTime = openTime;
      this.notifyArr = [];

      this.vacate();

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
      this.el.dataset.animationProcess = this.state;
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
      }, this.openTime);

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
      }, this.openTime);

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

  const cubeEl = document.querySelector('[data-animation-process-name="cube"]');
  const cube = new Animation(cubeEl);

  const textEl = document.querySelector('[data-animation-process-name="text"]');
  const text = new Animation(textEl);

  const getCubePosition = (top, height) => {
    const bottom = top + height;
    const outTop = (top + height * 0.1) < 0;
    const outBottom = (top + height * 0.9) - window.innerHeight > 0;

    if(outTop || outBottom) {
      return 'out';
    } else {
      return 'in';
    }
  }

  const changeCubeState = (ev) => {
    const { top, height } = cubeEl.getBoundingClientRect();

    window.removeEventListener('scroll', changeCubeState);

    if(cube.isState('closed') && getCubePosition(top, height) === 'in') {
      cube.open(() => {
        text.open(() => {
          // changeCubeState();
        });
      });

      return;
    }
    // } else if(cube.isState('open') && getCubePosition(top, height) === 'out') {
    //   text.close(() => {
    //     cube.close(() => {
    //       changeCubeState();
    //     });
    //   });
    //
    //   return;
    // }

    window.addEventListener('scroll', changeCubeState);

    return;
  }

  changeCubeState();

  class SmoothScroll {
    constructor(link) {
      this.link = link;

      const attr = this.link.getAttribute('href');

      if(!attr || attr.slice(0, 1) !== '#') throw new Error('SmoothScroll: Wrong element passed');

      this.target = document.getElementById( attr.slice(1) );

      this.link.addEventListener('click', (ev) => {
        ev.preventDefault();

        this.go();
      });
    }

    getCurrentPosition() {
      return this.target ? (window.scrollY || document.documentElement.scrollTop) + this.target.getBoundingClientRect().top : 0;
    }

    go() {
      this.animation = anime({
        targets: [document.body, document.documentElement],
        scrollTop: this.getCurrentPosition(),
        duration: 600,
        easing: "easeInOutQuart",
        autoplay: false,
        complete: () => {
          window.removeEventListener("wheel", this.pause);
          window.removeEventListener("touchstart", this.pause);
        }
      });

      window.addEventListener("wheel", this.pause);
      window.addEventListener("touchstart", this.pause);

      this.animation.restart();

      return;
    }

    pause = () => {
      this.animation.pause();

      this.animation = null;

      window.removeEventListener("wheel", this.pause);
      window.removeEventListener("touchstart", this.pause);

      return;
    }
  }

  const links = Array.from( document.querySelectorAll('[data-smooth-scroll]') )
    .forEach(e => new SmoothScroll(e));


  const icons = Array.from( document.querySelectorAll('[data-levitate]') ).reduce((acc, cur) => {
    setTimeout(() => {
      anime({
        targets: cur,
        top: ['10px', '-10px'],
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 0
      });

      return;
    }, acc);

    return acc + 200;
  }, 0);


}), false);

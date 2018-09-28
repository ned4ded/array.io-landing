// class VidePlayer {
//   constructor(frame, toggler, timeline = 500) {
//     this.frame = frame;
//     this.toggler = toggler;
//     this.timeline = 500;
//
//     this.loaded = false;
//     this.busy = false;
//
//     this.setState('loading');
//
//     this.frameID = frame.getAttribute('id');
//     if(!this.frameID) throw new Error('VideoPlayer: Specify frame ID');
//   }
//
//   setState(state) {
//     switch (state) {
//       case 'loading':
//         this.state = 'loading';
//         break;
//       case 'pause':
//         this.state = 'pause';
//         break;
//       case 'play':
//         this.state = 'play';
//         break;
//       case 'pausing':
//         this.state = 'pausing';
//         break;
//       case 'playing':
//         this.state = 'playing';
//         break;
//       default:
//         return new Error('VideoPlayer: Wrong State');
//     }
//
//     this.notify();
//
//     return this;
//   }
//
//   notify() {
//     this.frame.dataset.videoPlayerState = this.state;
//     this.toggler.dataset.videoPlayerState = this.state;
//   }
//
//   getState() {
//     return this.state;
//   }
//
//   isState(state) {
//     return this.getState() === state;
//   }
//
//   isBusy() {
//     return !!this.busy;
//   }
//
//   occupy() {
//     this.busy = true;
//   }
//
//   vacate() {
//     this.busy = false;
//   }
//
//   load() {
//     if(this.loaded) return;
//
//     this.loaded = true;
//
//     const onPlayerReady = (ev) => {
//       this.setState('pause');
//
//       this.toggler.addEventListener('click', this.play.bind(true));
//
//       return;
//     };
//
//     const onPlayerStateChange = (ev) => {
//       if(ev.data === YT.PlayerState.PAUSED || ev.data === YT.PlayerState.ENDED) {
//         return this.pause(false);
//       } else if(ev.data === YT.PlayerState.PLAYING) {
//         return this.play(false);
//       }
//
//       return;
//     }
//
//     this.player = new YT.Player(this.frame, {
//       events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//       }
//     });
//
//     return this;
//   }
//
//   play = (startPlaying, cb = () => {}) => {
//     if(this.isState('play') || this.isBusy() || !this.loaded) return false;
//
//     this.occupy();
//     this.setState('playing');
//
//     if(startPlaying) this.player.playVideo();
//
//     setTimeout(() => {
//       this.setState('play');
//       this.vacate();
//
//
//       return cb();
//     }, this.timeline);
//
//     return this;
//
//     return;
//   }
//
//   pause = (pausePlaying, cb = () => {}) => {
//     if(this.isState('pause') || this.isBusy() || !this.loaded) return false;
//
//     if(pausePlaying) this.player.pauseVideo();
//
//     this.occupy();
//     this.setState('pausing');
//
//     setTimeout(() => {
//       this.setState('pause');
//       this.vacate();
//
//       return cb();
//     }, this.timeline);
//
//     return this;
//
//     return;
//   }
// }
//
// const playerElements = (() => {
//   let player = document.getElementById('video-player');
//   let toggler = document.getElementById('video-toggler');
//
//   if(!toggler | !player) return undefined;
//
//   return { player, toggler };
// })();
//
// const player = new VidePlayer(playerElements.player, playerElements.toggler);

// function onYouTubeIframeAPIReady() {
//   player.load();
// };


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
          changeCubeState();
        });
      });

      return;
    } else if(cube.isState('open') && getCubePosition(top, height) === 'out') {
      text.close(() => {
        cube.close(() => {
          changeCubeState();
        });
      });

      return;
    }

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

  // (function() {
  //   if(!player) return;
  //
  //   const tag = document.createElement('script');
  //   tag.src = '//www.youtube.com/iframe_api';
  //
  //   const firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //
  //   return;
  // }());

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

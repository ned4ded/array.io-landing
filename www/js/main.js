"use strict";var _createClass=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}document.addEventListener("DOMContentLoaded",function(){document.querySelector("html").classList.remove("no-js");var t=Array.from(document.querySelectorAll("[data-toggle]")).map(function(t){return{toggler:t,togglees:JSON.parse(t.dataset.toggle).map(function(t){return document.getElementById(t)})}}),i=function(t){"true"!=t.dataset.visible?t.dataset.visible=!0:t.dataset.visible=!1};t.forEach(function(t){var e=t.toggler,n=t.togglees;e.addEventListener("click",function(t){t.preventDefault(),n.forEach(i)})});var e=document.getElementById("instruction-steps"),n=document.getElementById("instruction-steps-prev"),s=document.getElementById("instruction-steps-next"),o=(e&&new Swiper(e,{simulateTouch:!1,observer:!0,observeParents:!0,navigation:{prevEl:n,nextEl:s}}),function(){function i(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:500;_classCallCheck(this,i),this.listener=function(t){t.preventDefault()},this.el=t,this.lining=e,this.timeline=n,this.busy=!1,this.setState("closed")}return _createClass(i,[{key:"setState",value:function(t){switch(t){case"open":this.state="open";break;case"closed":this.state="closed";break;case"opening":this.state="opening";break;case"closing":this.state="closing";break;default:return new Error("ModalWindow: Wrong State")}return this.notify(),this}},{key:"notify",value:function(){this.el.dataset.modalState=this.state,this.lining.dataset.modalState=this.state}},{key:"getState",value:function(){return this.state}},{key:"isState",value:function(t){return this.getState()===t}},{key:"open",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState("open")&&!this.isBusy()&&(window.addEventListener("touchmove",this.listener),window.addEventListener("wheel",this.listener),this.occupy(),this.setState("opening"),setTimeout(function(){return t.setState("open"),t.vacate(),e()},this.timeline),this)}},{key:"close",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState("closed")&&!this.isBusy()&&(this.occupy(),this.setState("closing"),setTimeout(function(){return t.setState("closed"),t.vacate(),window.removeEventListener("touchmove",t.listener),window.removeEventListener("wheel",t.listener),e()},this.timeline),this)}},{key:"isBusy",value:function(){return!!this.busy}},{key:"occupy",value:function(){this.busy=!0}},{key:"vacate",value:function(){this.busy=!1}}]),i}()),a=document.getElementById("lining");Array.from(document.querySelectorAll("[data-modal-toggler]")).map(function(t){var e=t.dataset.modalToggler,n=document.getElementById(e);return n?{toggler:t,modal:new o(n,a)}:null}).forEach(function(t){var n=t.toggler,i=t.modal,s=function t(e){e.preventDefault(),n.removeEventListener("click",t),i.open(function(){a.addEventListener("click",o)})},o=function t(e){e.preventDefault(),a.removeEventListener("click",t),i.close(function(){n.addEventListener("click",s)})};n.addEventListener("click",s)});var r=function(){function n(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:500;_classCallCheck(this,n),this.el=t,this.openTime=e,this.notifyArr=[],this.vacate(),this.setState("closed")}return _createClass(n,[{key:"setState",value:function(t){switch(t){case"open":this.state="open";break;case"closed":this.state="closed";break;case"opening":this.state="opening";break;case"closing":this.state="closing";break;default:return new Error("ModalWindow: Wrong State")}return this.notify(),this}},{key:"notify",value:function(){this.el.dataset.animationProcess=this.state}},{key:"getState",value:function(){return this.state}},{key:"isState",value:function(t){return this.getState()===t}},{key:"open",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState("open")&&!this.isBusy()&&(this.occupy(),this.setState("opening"),setTimeout(function(){return t.setState("open"),t.vacate(),e()},this.openTime),this)}},{key:"close",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState("closed")&&!this.isBusy()&&(this.occupy(),this.setState("closing"),setTimeout(function(){return t.setState("closed"),t.vacate(),e()},this.openTime),this)}},{key:"isBusy",value:function(){return!!this.busy}},{key:"occupy",value:function(){this.busy=!0}},{key:"vacate",value:function(){this.busy=!1}}]),n}(),u=document.querySelector('[data-animation-process-name="cube"]'),c=new r(u),l=new r(document.querySelector('[data-animation-process-name="text"]')),h=function(t,e){var n=t+.1*e<0,i=0<t+.9*e-window.innerHeight;return n||i?"out":"in"};!function t(e){var n=u.getBoundingClientRect(),i=n.top,s=n.height;window.removeEventListener("scroll",t),c.isState("closed")&&"in"===h(i,s)?c.open(function(){l.open(function(){t()})}):c.isState("open")&&"out"===h(i,s)?l.close(function(){c.close(function(){t()})}):window.addEventListener("scroll",t)}();var d=function(){function i(t){var e=this;_classCallCheck(this,i),this.pause=function(){e.animation.pause(),e.animation=null,window.removeEventListener("wheel",e.pause),window.removeEventListener("touchstart",e.pause)},this.link=t;var n=this.link.getAttribute("href");if(!n||"#"!==n.slice(0,1))throw new Error("SmoothScroll: Wrong element passed");this.target=document.getElementById(n.slice(1)),this.link.addEventListener("click",function(t){t.preventDefault(),e.go()})}return _createClass(i,[{key:"getCurrentPosition",value:function(){return this.target?(window.scrollY||document.documentElement.scrollTop)+this.target.getBoundingClientRect().top:0}},{key:"go",value:function(){var t=this;this.animation=anime({targets:[document.body,document.documentElement],scrollTop:this.getCurrentPosition(),duration:600,easing:"easeInOutQuart",autoplay:!1,complete:function(){window.removeEventListener("wheel",t.pause),window.removeEventListener("touchstart",t.pause)}}),window.addEventListener("wheel",this.pause),window.addEventListener("touchstart",this.pause),this.animation.restart()}}]),i}();Array.from(document.querySelectorAll("[data-smooth-scroll]")).forEach(function(t){return new d(t)}),Array.from(document.querySelectorAll("[data-levitate]")).reduce(function(t,e){return setTimeout(function(){anime({targets:e,top:["10px","-10px"],loop:!0,direction:"alternate",easing:"easeInOutCubic",duration:1e3,delay:0})},t),t+200},0)},!1);
//# sourceMappingURL=main.js.map

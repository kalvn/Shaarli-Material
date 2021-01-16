import $ from 'jquery';
import animations from './animations';

const overlay = {
  listeners: {},
  element: undefined,
  init: function () {
    const _this = this;
    this.get().on('click', function (event) {
      if (event.target.id === 'overlay') {
        _this.hide();
      }

      _this.triggerEvent(event);
    });
  },
  get: function () {
    if (!this.element) {
      this.element = $('#overlay').eq(0);
    }
    return this.element;
  },
  show: function () {
    animations.fadeIn(this.get());
  },
  hide: function () {
    animations.fadeOut(this.get());
  },
  addContent: function (id, html) {
    if (this.get().find('#overlay-content-' + id).length === 0) {
      this.get().html('<div id="overlay-content-' + id + '">' + html + '</div>');
    } else {
      this.get().find('#overlay-content-' + id).html(html);
    }
  },
  addListener: function (id, callback) {
    this.listeners[id] = callback;
  },
  triggerEvent: function (event) {
    for (const listener in this.listeners) {
      if (typeof this.listeners[listener] === 'function') {
        this.listeners[listener](event);
      }
    }
  }
};

export default overlay;

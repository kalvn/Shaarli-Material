import $ from 'jquery';

import animations from './animations';
import batchEdit from './batch-edit';

const popup = {
  init: function () {
    const _this = this;

    $('html').on('click', function (event) {
      // If the click occurs in a popup, in a child of a popup or in a popup trigger, nothing happens.
      if ($.inArray('popup-trigger', event.target.classList) > -1 || $(event.target).parents('.popup-trigger').length >= 1 ||
              $.inArray('popup', event.target.classList) > -1 || $(event.target).parents('.popup').length >= 1) {
        // Nothing to do.
      } else {
        _this.hideAll();
      }

      if ($.inArray('actionbar-selectall-link', event.target.classList) > -1) {
        event.preventDefault();
        $('.link-outer').each(function () {
          batchEdit.toggleLink($(this), true);
        });
      }
    });

    $('.popup-trigger').on('click', function () {
      _this.hideAll();

      const $popup = $('#' + $(this).data('popup'));

      if ($popup.is(':visible')) {
        animations.fadeOut($popup);
      } else {
        animations.slideFromTop($popup);
      }
    });

    $('.popup-close').on('click', function () {
      _this.hideAll();
    });

    // Closes filters popup when changing number of links per page
    // because it feels more natural and gives user a feedback.
    $('.filters-links-per-page a').on('click', function (event) {
      _this.hideAll();
    });

    $('.popup-filter .switch label').on('click', function () {
      const url = $(this).data('url');

      window.location.href = url;
    });
  },

  hideAll: function () {
    $('.popup:visible').each(function () {
      animations.fadeOut($(this));
    });
  }
};

export default popup;

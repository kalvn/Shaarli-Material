import $ from 'jquery';

import animations from './animations';

const search = {
  init: function () {
    const displaySearch = function () {
      const overlayElement = $('#search-overlay');
      animations.fadeIn(overlayElement);
      overlayElement
        .find('#searchform_value')
        .focus()
        .select();

      animations.slideFromTop(overlayElement.find('.content-fullscreen'));
    };

    $('#button-search').on('click', displaySearch);
    $('#search-overlay').on('click', function (event) {
      if ($(event.target).parents('#form-search').length === 0 && event.target.nodeName.toLowerCase() !== 'form') {
        animations.fadeOut($(this));
      }
    });
    $(document).on('keyup', function (event) {
      const key = event.which || event.keyCode;
      if (key === 27) {
        // Closes search field when key "ESC" is pressed.
        const overlayElement = $('#search-overlay');
        animations.fadeOut(overlayElement);
      } else if (key === 83 && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA' && event.target.nodeName !== 'SELECT') {
        // Displays search field when key "S" is pressed.
        displaySearch();
      }
    });

    // Validation for tags search field.
    $('#button-filter').on('click', function () {
      const val = $('#searchform_value').val().trim();
      $('#tagfilter_value').val(val);
      $('#hidden-tag-form').trigger('submit');

      return false;
    });
  }
};

export default search;

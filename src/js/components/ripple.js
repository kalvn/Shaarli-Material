import $ from 'jquery';

const ripple = {
  init: function () {
    $('.ripple, .button, .button-raised, .button-inverse')
      .off('mousedown.tinymaterialripple')
      .not('[disabled]')
      .on('mousedown.tinymaterialripple', function (event) {
        const el = this;

        let offsetX = (event.pageX - $(event.target).offset().left);
        let offsetY = (event.pageY - $(event.target).offset().top);

        // Compensate the offset shift when the click is done on an element within the element we want the ripple to be displayed on.
        const getRealValues = function (element) {
          if (element === el || !element) {
            return;
          }

          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;

          getRealValues(element.offsetParent);
        };
        getRealValues(event.target);

        const $el = $(el);
        const rippleDefaultDiameter = 20;
        const $div = $('<div/>');

        $div.addClass('ripple-effect');
        $div.css({
          top: offsetY - (rippleDefaultDiameter / 2) + 'px', // - ($ripple.height() / 2),
          left: offsetX - (rippleDefaultDiameter / 2) + 'px', // - ($ripple.width() / 2),
          background: $el.data('ripple-color')
        }).appendTo($el);

        window.setTimeout(function () {
          $div.remove();
        }, 2000);
      });
  }
};

export default ripple;

import $ from 'jquery';

const notification = {
  init: function () {
    $('.notification-close').on('click', function () {
      const $el = $(this);
      const $notification = $el.closest('.notification');

      $notification.addClass('animate-fade-out');
      setTimeout(function () {
        $notification.remove();
      }, 250);
    });
  }
};

export default notification;

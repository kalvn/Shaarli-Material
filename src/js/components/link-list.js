import $ from 'jquery';

import modal from './modal';
import http from './http';

const linkList = {
  init: function () {
    // Delete button in the link list.
    $('.button-delete').on('click', function (event) {
      event.preventDefault();

      const url = $(this).attr('href');

      modal('Delete link', 'Are you sure you want to delete this link?', 'confirm', function (accepts) {
        if (accepts) {
          window.location.href = url;
        }
      });
      return false;
    });

    // Async thumbnail retrieval.
    if (shaarli.asyncMetadata) {
      $('div[data-async-thumbnail]').each(async function (index, el) {
        const $el = $(el);
        const id = $el.closest('[data-id]').data('id');

        const response = await http.updateThumbnail(id);

        if (response.thumbnail !== false) {
          const $img = $el.find('img');
          $img.attr('src', response.thumbnail);
          $img.data('src', response.thumbnail);
          $el.removeClass('hidden');
        }
      });
    }
  }
};

export default linkList;

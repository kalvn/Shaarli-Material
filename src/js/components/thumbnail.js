import $ from 'jquery';

import modal from './modal';

const thumbnail = {
  init: function () {
    if ($('.page-thumbnails').length === 0) {
      return;
    }

    const $thumbnailPlaceholder = $('.thumbnail-placeholder');
    const $thumbnailTitle = $('.thumbnail-link-title');
    const $progressCurrent = $('.progress-current');
    const $progressBarActual = $('.progress-actual');

    let i = 0;
    const thumbnailsIdList = $('[name="ids"]').val().split(',');
    const total = thumbnailsIdList.length;

    const updateThumbnail = function (id) {
      console.log('Updating thunmbnail #' + i + ' with id ' + id);
      $.ajax({
        url: shaarli.basePath + '/admin/shaare/' + thumbnailsIdList[i] + '/update-thumbnail',
        method: 'patch',
        dataType: 'json',
        success: function (response) {
          i++;
          $thumbnailTitle.text(response.title);
          if (response.thumbnail) {
            $thumbnailPlaceholder.html('<img title="Current thumbnail" src="' + response.thumbnail + '"/>');
          } else {
            $thumbnailPlaceholder.empty();
          }
          $progressCurrent.text(i);
          $progressBarActual.css('width', ((i * 100) / thumbnailsIdList.length) + '%');

          if (i < total) {
            updateThumbnail(thumbnailsIdList[i]);
          } else {
            $thumbnailTitle.text('Thumbnail update done!');
          }
        },
        error: function (xhr) {
          console.error('Failed to update thumbnail.');
          modal('Error', 'An error occurred while downloading thumbnails. Return code: ' + xhr.status, 'alert');
        }
      });
    };

    updateThumbnail(thumbnailsIdList[i]);
  }
};

export default thumbnail;

import $ from 'jquery';

import modal from './modal';
import animations from './animations';
import http from './http';

const tag = {
  init: function () {
    // Delete button on manage tag page.
    $('#button-delete').on('click', function (event) {
      event.preventDefault();

      const tag = $('#fromtag').val();
      const form = $(this).closest('form');

      modal('Delete the tag "' + tag + '"', 'Are you sure you want to delete the tag "' + tag + '" from all links?', 'confirm', function (accepts) {
        if (accepts) {
          form.append('<input type="hidden" name="deletetag">');
          form.submit();
        }
      });
      return false;
    });

    // Delete a tag on tag list page.
    $('.delete-tag').on('click', function (event) {
      event.preventDefault();

      const el = $(this);
      const tag = el.data('tag');
      const token = $('#token').val();

      modal('Delete the tag "' + tag + '"', 'Are you sure you want to delete the tag "' + tag + '" from all links ?', 'confirm', function (accepts) {
        if (accepts) {
          $.ajax({
            url: shaarli.basePath + '/admin/tags',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
              deletetag: 1,
              fromtag: tag,
              token
            },
            success: function () {
              const $toBeRemoved = el.closest('.list-item-flex');
              animations.compressHeight($toBeRemoved, null, function () {
                $toBeRemoved.remove();
              });
            },
            error: function () {
              modal('Error', 'Oops! something went wrong...', 'alert');
            },
            complete: function () {
              http.refreshToken();
            }
          });
        }
      });
    });

    // Rename a tag on tag list page.
    $('.rename-tag').on('click', function (event) {
      event.preventDefault();

      const el = $(this);
      const listItem = el.closest('.list-item-flex');
      const tag = el.data('tag');
      const token = $('#token').val();

      const feedback = $('<span/>')
        .addClass('text-feedback')
        .text('renaming...');

      modal('Rename tag ' + tag, 'Please write the new name of this tag below.', 'prompt', function (accepts, newTag) {
        if (accepts) {
          listItem.find('.list-item-middle').append(feedback);

          $.ajax({
            url: shaarli.basePath + '/admin/tags',
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
              fromtag: tag,
              totag: newTag,
              token,
              renametag: 'Rename tag'
            },
            success: function () {
              listItem.find('.tag-link').attr('href', shaarli.basePath + '/?searchtags=' + encodeURIComponent(newTag)).text(newTag);
              listItem.find('[data-tag]').data('tag', newTag);
              listItem.find('.count').attr('href', shaarli.basePath + '/add-tag/' + encodeURIComponent(newTag));
              listItem.find('.rename-tag').attr('href', shaarli.basePath + '/admin/tags?fromtag=' + encodeURIComponent(newTag));

              feedback.addClass('text-success')
                .text('renamed successfully!');
            },
            error: function () {
              feedback.addClass('text-error')
                .text('something went wrong');
            },
            complete: function () {
              http.refreshToken();
              setTimeout(function () {
                feedback.remove();
              }, 5000);
            }
          });
        }
      }, {
        buttonLabelOk: 'Rename',
        value: tag
      });
    });
  }
};

export default tag;

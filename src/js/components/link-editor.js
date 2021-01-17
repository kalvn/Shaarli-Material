import $ from 'jquery';
import autosize from 'autosize';

import modal from './modal';
import { escapeHtml } from './utils';

const initMetadata = function () {
  if (shaarli.pageName !== 'editlink' || !shaarli.asyncMetadata) {
    return;
  }

  const $loadingWrappers = $('.loading-wrapper');
  const $inputTitle = $('input[name="lf_title"]');
  const $inputDescription = $('textarea[name="lf_description"]');
  const $inputTags = $('input[name="lf_tags"]');
  const url = $('input[name="lf_url"]').val();

  if ($inputTitle.length > 0 && $inputTitle.val().length > 0) {
    return;
  }

  $loadingWrappers.addClass('is-loading');

  $.ajax({
    url: shaarli.basePath + '/admin/metadata?url=' + encodeURIComponent(url),
    method: 'get',
    success: function (data) {
      if (data.title && $inputTitle && $inputTitle.length > 0 && $inputTitle.val().length === 0) {
        $inputTitle.val(data.title);
      }

      if (data.description && $inputDescription && $inputDescription.length > 0 && $inputDescription.val().length === 0) {
        $inputDescription.val(data.description);
      }

      if (data.tags && $inputTags && $inputTags.length > 0 && $inputTags.val().length === 0) {
        $inputTags.val(data.tags);
      }
    },
    error: function (error) {
      console.error('Failed to get link metadata.');
      modal('Error', 'An error occurred while getting metadata for ' + escapeHtml(url), 'alert');
    },
    complete: function () {
      $loadingWrappers.removeClass('is-loading');
    }
  });
};

const linkEditor = {
  init: function () {
    const _this = this;

    $('.button-expand').on('click', function (event) {
      _this.toggleExpand($(this));
    }).each(function () {
      if (parseInt(localStorage.getItem('expand'))) {
        _this.toggleExpand($(this));
      }
    });

    autosize($('#lf_description'));
    initMetadata();

    // Delete button when editing an existing link.
    $('[name=delete_link]').on('click', function (event) {
      event.preventDefault();

      const url = $(this).attr('href');

      modal('Delete link', 'Are you sure you want to delete this link?', 'confirm', function (accepts) {
        if (accepts) {
          window.location.href = url;
        }
      });
      return false;
    });
  },

  toggleExpand: function (element) {
    const isExpanded = element.closest('.card').toggleClass('is-expanded').hasClass('is-expanded') ? 1 : 0;
    $('#editlinkform-row').toggleClass('row').find('#editlinkform-col').toggleClass('col-md-6 col-md-offset-3');

    localStorage.setItem('expand', isExpanded);
  }
};

export default linkEditor;

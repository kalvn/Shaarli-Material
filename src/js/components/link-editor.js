import $ from 'jquery';
import autosize from 'autosize';

import modal from './modal';
import { escapeHtml } from './utils';

const initMetadata = async function () {
  if ((shaarli.pageName !== 'editlink' && shaarli.pageName !== 'editlinkbatch') || !shaarli.asyncMetadata) {
    return;
  }

  // For each edit form present in the page.
  $('.editlinkform').each(async function (index, form) {
    const $form = $(form);

    const $loadingWrappers = $form.find('.loading-wrapper');
    const $inputTitle = $form.find('input[name="lf_title"]');
    const $inputDescription = $form.find('textarea[name="lf_description"]');
    const $inputTags = $form.find('input[name="lf_tags"]');
    const url = $form.find('input[name="lf_url"]').val();

    if ($inputTitle.length > 0 && $inputTitle.val().length > 0) {
      return;
    }

    $loadingWrappers.addClass('is-loading');

    try {
      const data = await $.ajax({
        url: shaarli.basePath + '/admin/metadata?url=' + encodeURIComponent(url),
        method: 'get'
      });

      if (data.title && $inputTitle && $inputTitle.length > 0 && $inputTitle.val().length === 0) {
        $inputTitle.val(data.title);
      }

      if (data.description && $inputDescription && $inputDescription.length > 0 && $inputDescription.val().length === 0) {
        $inputDescription.val(data.description);
      }

      if (data.tags && $inputTags && $inputTags.length > 0 && $inputTags.val().length === 0) {
        $inputTags.val(data.tags);
      }
    } catch (err) {
      console.error('Failed to get link metadata.');
      modal('Error', 'An error occurred while getting metadata for ' + escapeHtml(url), 'alert');
    }

    $loadingWrappers.removeClass('is-loading');
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

  toggleExpand: function ($element) {
    const $card = $element.closest('.card');
    const isExpanded = $card.toggleClass('is-expanded').hasClass('is-expanded') ? 1 : 0;
    $card.closest('.editlinkform-row').toggleClass('row').find('.editlinkform-col').toggleClass('col-md-6 col-md-offset-3');

    localStorage.setItem('expand', isExpanded);
  }
};

export default linkEditor;

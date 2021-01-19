import $ from 'jquery';

import http from './http';
import modal from './modal';

const saveLink = async function ($form) {
  const data = {};
  const exists = $form.find('[name="lf_id"]').length > 0;

  $form.find('input[type="text"], textarea, input[type="checkbox"], input[type="hidden"]')
    .each(function (index, element) {
      const $element = $(element);
      if ($element.attr('type') === 'checkbox') {
        if ($element.prop('checked')) {
          data[$element.attr('name')] = 'on';
        }

        return;
      }

      data[$element.attr('name')] = $element.val();
    });

  try {
    formBeforeLoad($form);

    await http.createLink(data);

    formAfterLoad($form, exists ? 'updated' : 'created', 'success');
  } catch (err) {
    console.error(err);
    formError($form);
    modal('Error', 'Something went wrong when saving the link.', 'alert');
  }
};

const saveAllLinks = async function () {
  const forms = document.querySelectorAll('form[name="linkform"]');
  const total = forms.length;
  const $progressOverlay = $('#progress-overlay');
  const $progressCurrent = $progressOverlay.find('.progress-current');
  const $progressTotal = $progressOverlay.find('.progress-total');
  const $progressActual = $progressOverlay.find('.progress-actual');

  $progressTotal.text(total);

  $progressOverlay.removeClass('hidden');

  for (let i = 0; i < total; i++) {
    await saveLink($(forms[i]));
    $progressCurrent.text(i + 1);
    $progressActual.css('width', `${(i + 1) * 100 / total}%`);
  }

  $progressOverlay.addClass('hidden');
};

const deleteLink = async function ($buttonDelete) {
  const url = $buttonDelete.attr('href');
  const $form = $buttonDelete.closest('form');

  modal('Delete link', 'Are you sure you want to delete this link?', 'confirm', async function (accepts) {
    if (accepts) {
      try {
        formBeforeLoad($form);

        await http.deleteLinkByUrl(url);

        formAfterLoad($form, 'deleted', 'danger');
      } catch (err) {
        console.error(err);
        formError($form);
        modal('Error', 'Something went wrong when deleting the link.', 'alert');
      }
    }
  });
};

const cancelLink = async function ($buttonCancel) {
  const $form = $buttonCancel.closest('form');

  formBeforeLoad($form);

  // Necessary for the animation to play properly.
  await new Promise(resolve => setTimeout(resolve, 100));

  formAfterLoad($form, 'cancelled');
};

// Checks if there are remaining links.
const noMoreLinks = function () {
  if ($('form[name="linkform"]').length === 0) {
    $('[name="save_edit_batch"]').attr('disabled', 'disabled');
  }
};

const formBeforeLoad = function ($form) {
  $form.append('<div class="card-overlay"></div>');
  const height = $form.height();
  $form.css('max-height', `${height}px`);
};
const formAfterLoad = function ($form, message, type) {
  const url = $form.find('[name="lf_url"]').val();
  const customClass = type ? `is-${type}` : '';
  $form.find('.card-overlay').html(`<div class="is-flex"><div class="nowrap">${url}</div><div class="tag is-light ${customClass}">${message}</div></div>`);
  $form.closest('.editlinkform').addClass('is-batch-done');
  // Prevents this form from being treated again.
  $form.removeAttr('name');
};
const formError = function ($form) {
  $form.find('.card-overlay').remove();
  $form.css('max-height', 'none');
};

const batchAdd = {
  init: function () {
    if (shaarli.pageName === 'addlink') {
      $('.button-batch-addform').on('click', function () {
        $('.batch-addform').removeClass('hidden');
        $(this).remove();
      });
    }

    if (shaarli.pageName === 'editlinkbatch') {
      // Single save buttons.
      $('[name="save_edit"]').on('click', async function (event) {
        event.preventDefault();
        await saveLink($(this).closest('form'));
        noMoreLinks();
        return false;
      });

      $('[name="save_edit_batch"]').on('click', async function (event) {
        event.preventDefault();
        await saveAllLinks();
        noMoreLinks();
        return false;
      });

      // Single delete buttons.
      $('[name="delete_link"]').off('click').on('click', async function (event) {
        event.preventDefault();
        await deleteLink($(this));
        noMoreLinks();
        return false;
      });

      // Single cancel buttons.
      $('[name="cancel-batch-link"]').on('click', async function (event) {
        event.preventDefault();
        await cancelLink($(this));
        noMoreLinks();
        return false;
      });
    }
  }
};

export default batchAdd;

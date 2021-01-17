import $ from 'jquery';

import http from './http';
import modal from './modal';

const saveLink = async function ($form) {
  const data = {};

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
    await http.createLink(data);
    $form.closest('.editlinkform').html('Link created successfully.');
  } catch (err) {
    console.error(err);
    modal('Error', 'Something went wrong when saving the link.', 'alert');
  }
};

const saveAllLinks = async function () {
  $('form[name="linkform"]').each(async function (index, form) {
    const $form = $(form);

    await saveLink($form);
    console.log('end of 1 round of saveAllLinks');
  });

  console.log('end of saveAllLinks');
};

const deleteLink = async function ($buttonDelete) {
  const url = $buttonDelete.attr('href');

  console.log('url to delete: ' + url);

  try {
    await http.deleteLinkByUrl(url);
    $buttonDelete.closest('.editlinkform').html('Link deleted successfully.');
  } catch (err) {
    console.error(err);
    modal('Error', 'Something went wrong when deleting the link.', 'alert');
  }
};

const cancelLink = function ($buttonCancel) {
  $buttonCancel.closest('.editlinkform').html('Link addition cancelled successfully.');
};

const redirectIfNoLinks = function () {
  if ($('form[name="linkform"]').length === 0) {
    window.location.href = `${shaarli.basePath}/`;
  }
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
        redirectIfNoLinks();
        return false;
      });

      $('[name="save_edit_batch"]').on('click', async function (event) {
        event.preventDefault();
        await saveAllLinks();
        redirectIfNoLinks();
        return false;
      });

      // Single delete buttons.
      $('[name="delete_link"]').off('click').on('click', async function (event) {
        event.preventDefault();
        await deleteLink($(this));
        redirectIfNoLinks();
        return false;
      });

      // Single cancel buttons.
      $('[name="cancel-batch-link"]').on('click', function (event) {
        event.preventDefault();
        cancelLink($(this));
        redirectIfNoLinks();
        return false;
      });
    }
  }
};

export default batchAdd;

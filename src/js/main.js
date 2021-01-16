import $ from 'jquery';
import 'salvattore';

import modal from './components/modal';

import ripple from './components/ripple';
import overlay from './components/overlay';
import batchEdit from './components/batch-edit';
import batchAdd from './components/batch-add';
import linkEditor from './components/link-editor';
import search from './components/search';
import popup from './components/popup';
import thumbnail from './components/thumbnail';
import tag from './components/tag';
import lib from './lib';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/awesomplete/awesomplete.css';
import '../scss/styles.scss';

const init = function () {
  // Init menu.
  $('.icon-unfold').on('click', function () {
    $('.header-main').toggleClass('unfold');
  });

  $('[data-href]').on('click', function () {
    const url = $(this).data('href');
    if (url) {
      document.location.href = url;
    }
  });
};

const initAdmin = function () {
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

  // Bookmarklet warning.
  $('.bookmarklet').on('click', function (event) {
    event.preventDefault();
    modal('Information', 'Drag this link to your bookmarks toolbar, or right-click it and choose Bookmark This Link.', 'alert');
    return false;
  });
};

// Initialize components
$(document).ready(function () {
  ripple.init();
  overlay.init();
  search.init();
  popup.init();
  init();

  lib.init();

  if (shaarli.isAuth) {
    linkEditor.init();
    batchEdit.init();
    batchAdd.init();
    thumbnail.init();
    tag.init();
    initAdmin();
  }

  $('.autofocus').focus();
});

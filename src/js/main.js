// Needed to polyfill promises for IE11.
import 'core-js/stable/promise';
import 'regenerator-runtime/runtime';

import $ from 'jquery';
import 'salvattore';

import modal from './components/modal';

import ripple from './components/ripple';
import overlay from './components/overlay';
import batchEdit from './components/batch-edit';
import batchAdd from './components/batch-add';
import linkEditor from './components/link-editor';
import linkList from './components/link-list';
import search from './components/search';
import popup from './components/popup';
import thumbnail from './components/thumbnail';
import tag from './components/tag';
import notification from './components/notification';
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

  if ($('.filter-on').length > 0) {
    $('#input-readlater').prop('checked', true);
    $('.header-button-filter').addClass('has-filter-readlater');
  }
};

const initAdmin = function () {
  // Bookmarklet warning.
  $('.bookmarklet').on('click', function (event) {
    event.preventDefault();
    modal('Information', 'Drag this link to your bookmarks toolbar, or right-click it and choose Bookmark This Link.', 'alert');
    return false;
  });
};

// Initialize components
$(function () {
  ripple.init();
  overlay.init();
  search.init();
  popup.init();
  notification.init();
  init();

  lib.init();

  if (shaarli.isAuth) {
    linkList.init();
    linkEditor.init();
    batchEdit.init();
    batchAdd.init();
    thumbnail.init();
    tag.init();
    initAdmin();
  }

  // Only autofocus the first element found.
  $('.autofocus').each(function (index, element) {
    $(element).trigger('focus');
    return false;
  });
});

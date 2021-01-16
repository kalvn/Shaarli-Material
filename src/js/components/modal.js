import $ from 'jquery';

import overlay from './overlay';
import ripple from './ripple';
import { escapeHtml } from './utils';

/**
 * Displays modal.
 * @param  {String}   title    Modal title.
 * @param  {String}   text     Modal body.
 * @param  {String}   type     Type of modal between alert, confirm and prompt.
 * @param  {Function} callback Callback called when main modal button is pushed.
 * @param  {Object}   options  Additional options:
 *                             - noHtmlEscape {Boolean} Prevent HTML escape of title and body.
 *                             - value {String} Value of input field when using type prompt.
 *                             - buttonLabelOk {String} Label for OK button. Defaults to 'OK'.
 *                             - buttonClassesOk {String} Classes for OK button.
 * @return {Void}
 */
const displayModal = function (title, text, type, callback, options) {
  options = options || {};
  title = options.noHtmlEscape ? title : escapeHtml(title);
  let html = '<div class="container"><div id="modal-container" class="col-md-6 col-md-offset-3"><div class="modal animate-slide-from-top"><div class="modal-title">' + title + '</div>';
  let body = '';
  let footer = '';

  if (text) {
    text = options.noHtmlEscape ? text : escapeHtml(text);
    body += '<p>' + text + '</p>';
  }

  switch (type) {
    case 'alert':
      footer += '<button class="button ripple pull-right modal-ok">' + (options && options.buttonLabelOk ? options.buttonLabelOk : 'OK') + '</button>';
      break;
    case 'confirm':
      footer += '<button class="button ripple ' + (options && options.buttonClassesOk ? options.buttonClassesOk : 'button-alert') + ' pull-right modal-ok">' + (options && options.buttonLabelOk ? options.buttonLabelOk : 'OK') + '</button><button class="button ripple pull-right modal-cancel">Cancel</button>';
      break;
    case 'prompt':
      body += '<input type="text" class="input-new-tag" placeholder="Enter a new value..." value="' + options.value + '"/>';
      footer += '<button class="button ripple ' + (options && options.buttonClassesOk ? options.buttonClassesOk : 'button-primary') + ' pull-right modal-ok">' + (options && options.buttonLabelOk ? options.buttonLabelOk : 'OK') + '</button><button class="button ripple pull-right modal-cancel">Cancel</button>';
      break;
    default:
      console.log('Modal type must be alert, confirm or prompt. ' + type + ' isn\'t recognized.');
      return;
  }

  html += '<div class="modal-body">' + body + '</div>';
  html += '<div class="modal-footer clearfix">' + footer + '</div></div>';

  overlay.addContent('modal', html);
  overlay.show();

  if (type === 'prompt') {
    $('.input-new-tag').focus();
  }

  overlay.addListener('modal', function (event) {
    const target = $(event.target);

    if (target.hasClass('modal-ok')) {
      if (typeof callback === 'function') {
        const userInput = $('#modal-container input.input-new-tag').val();
        callback(true, userInput);
      }
      overlay.hide();
    } else if (target.hasClass('modal-cancel') || target.hasClass('container') || target.attr('id') === 'modal-container' || target.attr('id') === 'overlay-modal') {
      if (typeof callback === 'function') {
        callback(false);
      }
      overlay.hide();
    }
  });

  ripple.init();
};

export default displayModal;

import $ from 'jquery';

import animations from './animations';
import { guid } from './utils';

const displayActionBar = function (options) {
  if (typeof options !== 'object') {
    console.error('displayActionBar expects an object as options.');
    return;
  }

  const uid = guid();
  let html = '<div id="' + uid + '" class="hidden actionbar ' + options.classes + '"><div class="container"><div class="row"><div class="actionbar-label">' + options.label + '</div><div class="actionbar-selectall">- <a href="#" class="actionbar-selectall-link">select all</a></div><div class="actionbar-controls">';

  if (options.displayCancel) {
    html += '<button type="button" class="button button-default" id="actionbar-cancel">Cancel</button>';
  }

  for (const i in options.controls) {
    const control = options.controls[i];
    html += '<button type="button" class="' + control.classes + '" id="' + control.id + '">' + control.label + '</button>';
  }

  html += '</div></div></div></div>';

  $('body').append(html);

  const $actionbar = $('#' + uid).eq(0);

  if (typeof options.onCancel === 'function') {
    $('#actionbar-cancel').on('click', function () {
      options.onCancel();
    });
  }

  for (const i in options.controls) {
    const control = options.controls[i];
    $('#' + control.id).on('click', control.callback);
  }

  animations.showSlideFromBottom($actionbar);

  return $actionbar;
};

export default displayActionBar;

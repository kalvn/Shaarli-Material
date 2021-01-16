import $ from 'jquery';

export const guid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
};

export const escapeHtml = function (html) {
  return $('<div/>').text(html).html();
};

export const objectSize = function (obj) {
  if (typeof obj !== 'object') {
    return 0;
  }

  return Object.keys(obj).length;
};

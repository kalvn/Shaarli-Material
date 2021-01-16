import $ from 'jquery';
import Blazy from 'blazy';
import Awesomplete from 'awesomplete';
import Sortable from 'sortablejs';
import QRCode from '../../node_modules/qrcode/build/qrcode';

import overlay from './components/overlay';

const initSortable = function () {
  // Sortable plugins in admin.
  $('.list-sortable').each(function () {
    Sortable.create(this, {
      animation: 200,
      draggable: '.list-item-sortable',
      handle: '.list-sortable-handle',
      forceFallback: true,
      onEnd: function (event) {
        let i = 0;
        const list = $(event.target);
        list.find('.list-item-sortable').each(function () {
          $(this).data('order', i).find('[type=hidden]').val(i);
          i++;
        });
      }
    });
  });
};

const initAutocomplete = function () {
  if ($('input[data-multiple]').length > 0) {
    let awesomplete;

    $('input[data-multiple]').each(function () {
      awesomplete = new Awesomplete(this, {
        filter: function (text, input) {
          return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
        },
        replace: function (text) {
          const before = this.input.value.match(/^.+ \s*|/)[0];
          this.input.value = before + text + ' ';
        },
        minChars: 1
      });

      $(this).on('click', function () {
        awesomplete.close();
      });
    });

    /**
         * Remove already selected items from autocompletion list.
         * HTML list is never updated, so removing a tag will add it back to awesomplete.
         *
         * FIXME: This a workaround waiting for awesomplete to handle this.
         *  https://github.com/LeaVerou/awesomplete/issues/16749
         */
    const input = $('#lf_tags');
    input.on('input', function () {
      const proposedTags = input.data('list').replace(/,/g, '').split(' ');
      const reg = /(\w+) /g;
      let match;
      while ((match = reg.exec(input.val())) !== null) {
        const id = proposedTags.indexOf(match[1]);
        if (id !== -1) {
          proposedTags.splice(id, 1);
        }
      }
      awesomplete.list = proposedTags;
    });
  }
};

const initQrCode = function () {
  // Removes the onclick attribute to override the Shaarli default qrcode button's behavior.
  $('.icon-qrcode, .qrcode').removeAttr('onclick').off('click').on('click', function (event) {
    event.preventDefault();

    const url = $(this).data('permalink');

    overlay.addListener('qrcode', function (event) {
      overlay.hide();
    });
    overlay.addContent('qrcode', '<div><canvas id="qrcode"/></div>');

    QRCode.toCanvas(document.getElementById('qrcode'), url, {
      errorCorrectionLevel: 'H',
      width: 250
    }, function (error) {
      if (error) {
        console.error(error); // todo display modal error
      }
    });

    overlay.show();

    // Disable original click event.
    return false;
  });
};

const lib = {
  init: function () {
    /* eslint-disable no-new */
    new Blazy();

    initAutocomplete();
    initQrCode();

    if (shaarli.isAuth) {
      initSortable();
    }
  }
};

export default lib;

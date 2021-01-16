import $ from 'jquery';

import modal from './modal';
import actionBar from './action-bar';
import animations from './animations';
import { escapeHtml, objectSize } from './utils';

// Data model.
const model = {
  selectedLinks: {}
};

let isBatchModeEnabled = false;
const $toolbarButtonBatchTrigger = $('.batch-trigger');
let $batchDeleteActionBar = null;

const batchEdit = {
  init: function () {
    $toolbarButtonBatchTrigger.on('click', () => {
      this.toggle();
    });
  },

  toggle: function () {
    const _this = this;

    if (!isBatchModeEnabled) {
      isBatchModeEnabled = true;
      $toolbarButtonBatchTrigger.addClass('filter-on');

      // Displays informative modal if it's the first time.
      const batchModeModalKey = 'batchInformationViewed';
      if (localStorage && !localStorage.getItem(batchModeModalKey)) {
        modal('Multiple link selection', 'You now enter batch link selection mode. You can select several links by clicking on them and select an action in the bottom bar.', 'alert', function (result) {
          if (result) {
            localStorage.setItem(batchModeModalKey, true);
          }
        }, {
          buttonLabelOk: 'Understood!'
        });
      }

      $('.links-list').addClass('is-selectable');

      $('.link-outer').on('click.batch', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const $element = $(this);
        const id = $element.attr('id');

        if ($element.hasClass('is-selected')) {
          $element.removeClass('is-selected');
          delete model.selectedLinks[id];

          _this.refreshLabel();
        } else {
          $element.addClass('is-selected');
          model.selectedLinks[id] = {
            id: id,
            title: escapeHtml($element.find('.link-title').text())
          };

          _this.refreshLabel();
        }
      });

      // Hide add button.
      animations.hideSlideToBottom($('.button-floating'));

      $batchDeleteActionBar = actionBar({
        label: '',
        classes: 'actionbar-delete-links',
        displayCancel: true,
        onCancel: () => {
          this.toggle();
        },
        controls: [
          {
            id: 'delete-links-button',
            label: 'Delete',
            classes: 'button button-alert',
            callback: function (event) {
              let linksIds = '';
              let linksTexts = '<ul class="is-bordered">';
              const linksIdTab = [];
              const length = objectSize(model.selectedLinks);

              for (const id in model.selectedLinks) {
                linksIdTab.push(id);
                linksTexts += '<li>#<strong>' + id + '</strong>' + model.selectedLinks[id].title + '</li>';
              }

              linksTexts += '</ul>';
              linksIds = linksIdTab.join('+');
              const url = shaarli.basePath + '/admin/shaare/delete?id=' + linksIds + '&token=' + encodeURIComponent($('#token').val());

              modal('Are you sure to delete ' + length + ' links?', 'The following links will be <strong>IRRETRIEVABLY</strong> deleted: ' + linksTexts, 'confirm', function (accepted) {
                if (accepted) {
                  window.location.href = url;
                }
              }, {
                noHtmlEscape: true,
                buttonLabelOk: 'Delete ' + length + ' links'
              });
            }
          },
          {
            id: 'set-links-public-button',
            label: 'Set public',
            classes: 'button button-primary',
            callback: function (event) {
              let linksIds = '';
              let linksTexts = '<ul class="is-bordered">';
              const linksIdTab = [];
              const length = objectSize(model.selectedLinks);

              for (const id in model.selectedLinks) {
                linksIdTab.push(id);
                linksTexts += '<li>#<strong>' + id + '</strong>' + model.selectedLinks[id].title + '</li>';
              }

              linksTexts += '</ul>';
              linksIds = linksIdTab.join('+');
              const url = shaarli.basePath + '/admin/shaare/visibility?token=' + encodeURIComponent($('#token').val()) + '&newVisibility=public&id=' + linksIds;

              modal('Are you sure to set those ' + length + ' links public?', 'The following links will be set as <strong>public</strong>: ' + linksTexts, 'confirm', function (accepted) {
                if (accepted) {
                  window.location.href = url;
                }
              }, {
                noHtmlEscape: true,
                buttonLabelOk: 'Set ' + length + ' links public',
                buttonClassesOk: 'button-primary'
              });
            }
          },
          {
            id: 'set-links-private-button',
            label: 'Set private',
            classes: 'button button-primary',
            callback: function (event) {
              let linksIds = '';
              let linksTexts = '<ul class="is-bordered">';
              const linksIdTab = [];
              const length = objectSize(model.selectedLinks);

              for (const id in model.selectedLinks) {
                linksIdTab.push(id);
                linksTexts += '<li>#<strong>' + id + '</strong>' + model.selectedLinks[id].title + '</li>';
              }

              linksTexts += '</ul>';
              linksIds = linksIdTab.join('+');
              const url = shaarli.basePath + '/admin/shaare/visibility?token=' + encodeURIComponent($('#token').val()) + '&newVisibility=private&id=' + linksIds;

              modal('Are you sure to set those ' + length + ' links private?', 'The following links will be set as <strong>private</strong>: ' + linksTexts, 'confirm', function (accepted) {
                if (accepted) {
                  window.location.href = url;
                }
              }, {
                noHtmlEscape: true,
                buttonLabelOk: 'Set ' + length + ' links private',
                buttonClassesOk: 'button-primary'
              });
            }
          }
        ]
      });

      _this.refreshLabel();
    } else {
      isBatchModeEnabled = false;
      $toolbarButtonBatchTrigger.removeClass('filter-on');

      $('.link-outer').off('click.batch');
      $('.links-list').removeClass('is-selectable');

      // Hides acction bar.
      animations.hideSlideToBottom($('.actionbar'), null, function () {
        $('.actionbar').remove();
      });

      // Shows back the add button.
      animations.showSlideFromBottom($('.button-floating'));
    }
  },

  toggleLink: function ($link, forceSelect, forceDeselect) {
    const _this = this;
    const id = $link.attr('id');

    const select = function () {
      $link.addClass('is-selected');
      model.selectedLinks[id] = {
        id: id,
        title: escapeHtml($link.find('.link-title').text())
      };

      _this.refreshLabel();
    };

    const deselect = function () {
      $link.removeClass('is-selected');
      delete model.selectedLinks[id];

      _this.refreshLabel();
    };

    if (forceSelect) {
      select();
      return;
    }

    if (forceDeselect) {
      deselect();
      return;
    }

    if ($link.hasClass('is-selected')) {
      deselect();
    } else {
      select();
    }
  },

  refreshLabel: function () {
    const numberOfLinksSelected = objectSize(model.selectedLinks);
    $batchDeleteActionBar.find('.actionbar-label').text(numberOfLinksSelected + ' links selected');

    if (numberOfLinksSelected === 0) {
      $batchDeleteActionBar.find('button:not(#actionbar-cancel)').attr('disabled', 'disabled');
    } else {
      $batchDeleteActionBar.find('button:not(#actionbar-cancel)').removeAttr('disabled');
    }
  }
};

export default batchEdit;

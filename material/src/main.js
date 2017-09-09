(function(undefined){
    'use strict';

    var isAnimationSupported;   // Cache for checkAnimationSupport();
    var animationEventName = 'animationend';

    var init = function(){
        checkAnimationSupport();

        initPopups();
        initMenu();
        initButtons();
        initSearch();
        initDatesFormat();
        initQrCode();
        initMaterialForms();
        initMaterialRippleEffect();
        initAutocomplete(jQuery);
        initBlazy();
        initOverlay();

        if(shaarli.isAuth){
            initSortable();
            initFirefoxSocial();
        }
    };

    var initMenu = function(){
        $('.icon-unfold').on('click', function(){
            $('.header-main').toggleClass('unfold');
        });
    };

    var initPopups = function(){
        $('html').on('click', function(event){
            if($.inArray('popup-trigger', event.target.classList) > -1 || $(event.target).parents('.popup-trigger').length >= 1){
                // Nothing to do.
            } else{
                //$('.popup').hide();
                hidePopups();
            }
        });

        $('.popup-trigger').on('click', function(){
            hidePopups();
            
            var $popup = $('#' + $(this).data('popup'));

            if($popup.is(':visible')){
                //$popup.fadeOut(400);
                animations.fadeOut($popup);
            } else{
                //$('.popup').hide();
                //$popup.fadeIn(400);
                
                //animations.fadeIn($popup);
                animations.slideFromTop($popup);
            }
        });

        $('.popup').on('click', function(event){
            if(event.target.tagName !== 'A'){
                event.preventDefault();
                return false;
            }
        });
    };

    var initButtons = function(){
        // Delete button in the link list.
        $('.button-delete').on('click', function(event){
            event.preventDefault();

            var form = $(this).closest('form');
            
            displayModal('Delete link', 'Are you sure you want to delete this link ?', 'confirm', function(accepts){
                if(accepts){
                    form.submit();
                }
            });
            return false;
        });
        // Delete button when editing an existing link.
        $('[name=delete_link]').on('click', function(event){
            event.preventDefault();

            var url = $(this).attr('href');

            displayModal('Delete link', 'Are you sure you want to delete this link ?', 'confirm', function(accepts){
                if(accepts){
                    window.location.href = url;
                }
            });
            return false;
        });
        $('#button-delete').on('click', function(event){
            event.preventDefault();

            var tag = $('#fromtag').val();
            var form = $(this).closest('form');

            displayModal('Delete the tag "' + tag + '"', 'Are you sure you want to delete the tag "' + tag + '" from all links ?', 'confirm', function(accepts){
                if(accepts){
                    form.append('<input type="hidden" name="deletetag">');
                    form.submit();
                }
            });
            return false;
        });
        $('.bookmarklet').on('click', function(event){
            event.preventDefault();
            displayModal('Information', 'Drag this link to your bookmarks toolbar, or right-click it and choose Bookmark This Link.', 'alert');
            return false;
        });

        $('.button-expand').on('click', function(event){
            toggleExpand($(this));
        }).each(function(){
            if(parseInt(localStorage.getItem('expand'))){
                toggleExpand($(this));
            }
        });

        // Button to delete a tag.
        $('.delete-tag').on('click', function(event){
            event.preventDefault();

            var el = $(this);
            var tag = el.data('tag');
            var token = $('#token').val();
            
            displayModal('Delete the tag "' + tag + '"', 'Are you sure you want to delete the tag "' + tag + '" from all links ?', 'confirm', function(accepts){
                if(accepts){
                    $.ajax({
                        url: '?do=changetag',
                        method: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        data: {
                            deletetag: 1,
                            fromtag: tag,
                            token: token
                        },
                        success: function(){
                            el.closest('.list-item').remove();
                        },
                        error: function(){
                            displayModal('Error', 'Oops! something went wrong...', 'alert');
                        },
                        complete: function(){
                            refreshToken();
                        }
                    });
                }
            });
        });

        $('.rename-tag').on('click', function(event){
            event.preventDefault();

            var el = $(this);
            var listItem = el.closest('.list-item-flex');
            var tag = el.data('tag');
            var token = $('#token').val();

            var feedback = $('<span/>')
                .addClass('text-feedback')
                .text('renaming...');

            displayModal('Rename tag ' + tag, 'Please write the new name of this tag below.', 'prompt', function(accepts, newTag){
                if(accepts){
                    listItem.find('.list-item-middle').append(feedback);

                    $.ajax({
                        url: '?do=changetag',
                        method: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        data: {
                            fromtag: tag,
                            totag: newTag,
                            token: token,
                            renametag: 'Rename tag'
                        },
                        success: function(){
                            listItem.find('.tag-link').attr('href', '?searchtags=' + encodeURIComponent(newTag)).text(newTag);
                            listItem.find('[data-tag]').data('tag', newTag);
                            listItem.find('.count').attr('href', '?addtag=' + encodeURIComponent(newTag));
                            listItem.find('.rename-tag').attr('href', '?do=changetag&fromtag=' + encodeURIComponent(newTag));

                            feedback.addClass('text-success')
                                .text('renamed successfully!');
                        },
                        error: function(){
                            feedback.addClass('text-error')
                                .text('something went wrong');
                        },
                        complete: function(){
                            refreshToken();
                            setTimeout(function(){
                                feedback.remove();
                            }, 5000);
                        }
                    });
                }
            }, {
                buttonLabelOk: 'Rename',
                value: tag
            });
        });

        $('[data-href]').on('click', function(){
            var url = $(this).data('href');
            if(url){
                document.location.href = url;
            }
        });
    };

    var initSearch = function(){
        $('#button-search').on('click', function(){
            var overlayElement = $('#search-overlay');
            animations.fadeIn(overlayElement);
            overlayElement
                .find('#searchform_value')
                .focus()
                .select();

            animations.slideFromTop(overlayElement.find('.content-fullscreen'));
        });
        $('#search-overlay').on('click', function(event){
            if($(event.target).parents('#form-search').length === 0 && event.target.nodeName.toLowerCase() !== 'form'){
                animations.fadeOut($(this));
            }
        });
        $(document).on('keydown', function(event){
            if(event.keyCode === 27){
                var overlayElement = $('#search-overlay');
                animations.fadeOut(overlayElement);
            }
        });

        // Validation for tags search field.
        $('#button-filter').on('click', function(){
            var val = $('#searchform_value').val().trim();
            $('#tagfilter_value').val(val);
            $('#hidden-tag-form').submit();

            return false;
        });
    };

    var initDatesFormat = function(){
        // Change date format for recent entries.
        if(shaarli.fromNow && (shaarli.fromNow === 'true' || shaarli.fromNow === '1' || shaarli.fromNow === 1)){
            $('.link-actual-date').each(function(index){
                var pattern = shaarli.datePattern;
                var newDate = '';
                if(pattern){
                    newDate = moment($(this).html(), pattern).fromNow();
                } else{
                    newDate = moment(new Date($(this).html())).fromNow();
                }
                $(this).html(newDate);
            });
        }
    };

    var initQrCode = function(){
        // Removes the onclick attribute to override the Shaarli default qrcode button's behavior.
        $('.icon-qrcode, .qrcode').removeAttr('onclick').on('click', function(event){
            event.preventDefault();

            var url = $(this).attr('href');

            overlay.addListener('qrcode', function(event){
                overlay.hide();
            });
            overlay.addContent('qrcode', '<img src="' + url + '" alt="QR Code" />');
            overlay.show();

            // Disable original click event.
            return false;
        });
    };

    var initMaterialForms = function(){
        $('input[type=text],input[type=search],input[type=password],textarea').on('focus', function(){
            var $input = $(this);
            var id = $input.attr('id');

            if(typeof id === 'string' && id !== ''){
                var $label = $('label[for=' + id + ']');
                if($label.length > 0){
                    $label.addClass('active');
                }
            }
        }).on('blur', function(){
            var $input = $(this);
            var id = $input.attr('id');

            if(typeof id === 'string' && id !== ''){
                var $label = $('label[for=' + id + ']');
                if($label.length > 0){
                    $label.removeClass('active');
                }
            }
        });
    };

    var initMaterialRippleEffect = function(){
        $('.ripple, .button, .button-raised')
            .off('mousedown.tinymaterialripple')
            .not('[disabled]')
            .on('mousedown.tinymaterialripple', function(event){
                var el = this;

                var offsetX = (event.pageX - $(event.target).offset().left);
                var offsetY = (event.pageY - $(event.target).offset().top);

                // Compensate the offset shift when the click is done on an element within the element we want the ripple to be displayed on.
                var getRealValues = function(element){
                    if(element == el || !element){
                        return;
                    }

                    offsetX += element.offsetLeft;
                    offsetY += element.offsetTop;

                    getRealValues(element.offsetParent);
                }
                getRealValues(event.target);

                var el = $(el);
                var rippleDefaultDiameter = 20;
                var $div = $('<div/>');

                $div.addClass('ripple-effect');
                $div.css({
                    top: offsetY - (rippleDefaultDiameter/2) + 'px',// - ($ripple.height() / 2),
                    left: offsetX - (rippleDefaultDiameter/2) + 'px',// - ($ripple.width() / 2),
                    background: el.data("ripple-color")
                }).appendTo(el);

                window.setTimeout(function() {
                    $div.remove();
                }, 2000);
            });
    };

    var initAutocomplete = function($){
        if($('input[data-multiple]').length > 0){
            var awesomplete;

            $('input[data-multiple]').each(function(){
                awesomplete = new Awesomplete(this, {
                    filter: function(text, input) {
                        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^ ]*$/)[0]);
                    },
                    replace: function(text) {
                        var before = this.input.value.match(/^.+ \s*|/)[0];
                        this.input.value = before + text + " ";
                    },
                    minChars: 1
                });

                $(this).on('click', function(){
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
            var input = jQuery('#lf_tags');
            input.on('input', function(){
                proposedTags = input.data('list').replace(/,/g, '').split(' ');
                reg = /(\w+) /g;
                while((match = reg.exec(input.val())) !== null) {
                    id = proposedTags.indexOf(match[1]);
                    if(id != -1 ) {
                        proposedTags.splice(id, 1);
                    }
                }
                awesomplete.list = proposedTags;
            });
        }
    };

    var initSortable = function(){
        // Sortable plugins in admin.
        $('.list-sortable').each(function(){
            var sortable = Sortable.create(this, {
                animation: 200,
                draggable: '.list-item-sortable',
                handle: '.list-sortable-handle',
                forceFallback: true,
                onEnd: function(event){
                    var i = 0;
                    var list = $(event.target);
                    list.find('.list-item-sortable').each(function(){
                        $(this).data('order', i).find('[type=hidden]').val(i);
                        i++;
                    });
                }
            });
        });
    };

    var initBlazy = function(){
        var bLazy = new Blazy();
    };

    var initFirefoxSocial = function(){
        function activateFirefoxSocial(node) {
            var loc = location.href;
            var baseURL = loc.substring(0, loc.lastIndexOf("/"));
            // Keeping the data separated (ie. not in the DOM) so that it's maintainable and diffable.
            var data = {
                name: document.title,
                description: "The personal, minimalist, super-fast, no-database delicious clone.",
                author: "Shaarli",
                version: "1.0.0",
                iconURL: baseURL + "/tpl/material/images/favicons/favicon-96x96.png",
                icon32URL: baseURL + "/tpl/material/images/favicons/favicon-32x32.png",
                icon64URL: baseURL + "/tpl/material/images/favicons/favicon-64x64.png",
                shareURL: baseURL + "?post=%{url}&title=%{title}&description=%{description}&source=firefoxsocialapi",
                homepageURL: baseURL
            };
            node.setAttribute("data-service", JSON.stringify(data));
            var activate = new CustomEvent("ActivateSocialFeature");
            node.dispatchEvent(activate);
        }

        // Hack taken from https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if(!isFirefox || window.location.protocol.indexOf('https') < 0){
            $('#firefoxsocial').attr('disabled', 'disabled');
            var message = $("<p></p>")
                .addClass('highlight')
                .html('You need to use Firefox over <strong>https</strong> to use this functionality.');
            $('#firefox-api-title').after(message);
        } else{
            // Attach events to the Firefox Social button.
            $('#firefoxsocial').on('click', function(){
                activateFirefoxSocial(this);
            });
        }
    };

    var initOverlay = function(){
        overlay.get().on('click', function(event){
            if(event.target.id === 'overlay'){
                overlay.hide();
            }

            overlay.triggerEvent(event);
        });
    };

    /*----------------*/

    var animations = {
        animation: function(animationName, element, callbackBegin, callbackEnd){
            if(isAnimationSupported){
                element.on(animationEventName + '.' + animationName, function(){
                    // Removes this listener and animation classes.
                    $(this).off(animationEventName + '.' + animationName)
                        .removeClass(function(index, classes){
                            return (classes.match(/animate-\S+/g) || []).join(' ');
                        });

                    // Calls the specified callback if it exists.
                    if(typeof callbackEnd === 'function'){
                        callbackEnd();
                    }
                });

                element.addClass('animate-' + animationName);
                if(typeof callbackBegin === 'function'){
                    callbackBegin();
                }
            } else{
                if(typeof callbackBegin === 'function'){
                    callbackBegin();
                }
                if(typeof callbackEnd === 'function'){
                    callbackEnd();
                }
            }
        },
        fadeIn: function(element, callbackBegin, callbackEnd){

            var realCallbackBegin = function(){
                element.removeClass('hidden');
                if(typeof callbackBegin === 'function'){
                    callbackBegin();
                }
            }

            this.animation('fade-in', element, realCallbackBegin, callbackEnd);
        },
        fadeOut: function(element, callbackBegin, callbackEnd){

            var realCallbackEnd = function(){
                element.addClass('hidden');
                if(typeof callbackEnd === 'function'){
                    callbackEnd();
                }
            }

            this.animation('fade-out', element, callbackBegin, realCallbackEnd);
        },
        slideFromTop: function(element, callbackBegin, callbackEnd){
            var realCallbackBegin = function(){
                element.removeClass('hidden');
                if(typeof callbackBegin === 'function'){
                    callbackBegin();
                }
            }

            this.animation('slide-from-top', element, realCallbackBegin, callbackEnd);
        },
        slideFromRight: function(element, callbackBegin, callbackEnd){
            var realCallbackBegin = function(){
                element.removeClass('hidden');
                if(typeof callbackBegin === 'function'){
                    callbackBegin();
                }
            }

            this.animation('slide-from-right', element, realCallbackBegin, callbackEnd);
        }
    };

    /**
     * Taken from: https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
     */
    var checkAnimationSupport = function(){
        if(typeof isAnimationSupported !== 'undefined'){
            return isAnimationSupported;
        }

        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
            pfx  = '',
            elm = document.createElement('div');

        if( elm.style.animationName !== undefined ) { animation = true; }    

        if( animation === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    pfx = domPrefixes[ i ];
                    animationstring = pfx + 'Animation';
                    keyframeprefix = '-' + pfx.toLowerCase() + '-';
                    animation = true;
                    break;
                }
            }
        }

        animationEventName = animationstring + 'end';
        isAnimationSupported = animation;
        return animation;
    };

    var displayModal = function(title, text, type, callback, options){
        var html = '<div class="container"><div id="modal-container" class="col-md-6 col-md-offset-3"><div class="modal animate-slide-from-top"><div class="modal-title">' + escapeHtml(title) + '</div>';
        var body = '';
        var footer = '';
        if(text){
            body += '<p>' + escapeHtml(text) + '</p>';
        }

        switch(type){
            case 'alert':
                footer += '<button class="button ripple pull-right modal-ok">OK</button>';
                break;
            case 'confirm':
                footer += '<button class="button ripple button-alert pull-right modal-ok">OK</button><button class="button ripple pull-right modal-cancel">Cancel</button>';
                break;
            case 'prompt':
                body += '<input type="text" class="input-new-tag" placeholder="Enter a new value..." value="' + options.value + '"/>';
                footer += '<button class="button ripple button-primary pull-right modal-ok">' + (options && options.buttonLabelOk ? options.buttonLabelOk : 'OK') + '</button><button class="button ripple pull-right modal-cancel">Cancel</button>';
                break;
            default:
                console.log('Modal type must be alert, confirm or prompt. ' + type + ' isn\'t recognized.');
                return;
        }

        html += '<div class="modal-body">' + body + '</div>'
        html += '<div class="modal-footer clearfix">' + footer + '</div></div>';

        overlay.addContent('modal', html);
        overlay.show();
        overlay.addListener('modal', function(event){
            var target = $(event.target);

            if(target.hasClass('modal-ok')){
                if(typeof callback === 'function'){
                    var userInput = $('#modal-container input.input-new-tag').val();
                    callback(true, userInput);
                }
                overlay.hide();
            } else if(target.hasClass('modal-cancel') || target.hasClass('container') || target.attr('id') === 'modal-container' || target.attr('id') === 'overlay-modal'){
                if(typeof callback === 'function'){
                    callback(false);
                }
                overlay.hide();
            }
        });

        initMaterialRippleEffect();
    };

    var hidePopups = function(){
        $('.popup:visible').each(function(){
            animations.fadeOut($(this));
        });
    };

    var toggleExpand = function(element){
        var isExpanded = element.closest('.card').toggleClass('is-expanded').hasClass('is-expanded') ? 1 : 0;
        $('#editlinkform-row').toggleClass('row').find('#editlinkform-col').toggleClass('col-md-6 col-md-offset-3');

        localStorage.setItem('expand', isExpanded);
    };

    var escapeHtml = function(html){
        return $('<div/>').text(html).html();
    };

    // Refresh the CSRF token and pass it to the callback.
    var refreshToken = function(callback){
        $.ajax({
            url: '?do=token',
            method: 'get',
            success: function(token){
                $('#token').val(token);

                if(typeof callback === 'function'){
                    callback(token);
                }
            },
            error: function(){
                console.error('Failed to refresh token.');
            }
        });
    };

    var overlay = {
        listeners: {},
        element: undefined,
        get: function(){
            if(!this.element){
                this.element = $('#overlay').eq(0);
            }
            return this.element;
        },
        show: function(){
            animations.fadeIn(this.get());
        },
        hide: function(){
            animations.fadeOut(this.get());
        },
        addContent: function(id, html){
            if(this.get().find('#overlay-content-' + id).length === 0){
                this.get().html('<div id="overlay-content-' + id + '">' + html + '</div>');
            } else{
                this.get().find('#overlay-content-' + id).html(html);
            }
        },
        addListener: function(id, callback){
            this.listeners[id] = callback;
        },
        triggerEvent: function(event){
            for(var listener in this.listeners){
                if(typeof this.listeners[listener] === 'function'){
                    this.listeners[listener](event);
                }
            }
        }
    };

    $(document).ready(function(){
        init();
    });
})();

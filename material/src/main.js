$(document).ready(function(){
    $('html').on('click', function(event){
        if($.inArray('popup-trigger', event.target.classList) > -1 || $(event.target).parents('.popup-trigger').length >= 1){
            // Nothing to do.
        } else{
            $('.popup').hide();
        }
    });

    $('.popup-trigger').on('click', function(){
        var $popup = $('#' + $(this).data('popup'));

        if($popup.is(':visible')){
            $popup.fadeOut(400);
        } else{
            $('.popup').hide();
            $popup.fadeIn(400, function(){
                // Removed the focus because it opens the keyboard on mobile device and it's not very nice.
                // $(this).find('input[type=text]').first().focus();
            });
        }
    });

    $('.popup').on('click', function(event){
        if(event.target.tagName !== 'A'){
            event.preventDefault();
            return false;
        }
    });

    // Buttons.
    $('[name=delete_link], .button-delete').on('click', function(){
        var form = $(this).closest('form');
        displayModal('Delete link', 'Are you sure you want to delete this link ?', 'confirm', function(accepts){
            if(accepts){
                // This input is required for the editlink form which change its behavior based on the name of the button.
                form.append('<input type="hidden" name="delete_link">');
                form.submit();
            }
        });
        return false;
    });
    $('#button-delete').on('click', function(){
        var tag = $('#fromtag').val();
        var form = $(this).closest('form');

        displayModal('Delete the tag "' + tag + '"', 'Are you sure you want to delete the tag <strong>' + tag + '</strong> from all links ?', 'confirm', function(accepts){
            if(accepts){
                form.append('<input type="hidden" name="deletetag">');
                form.submit();
            }
        });
        return false;
    });
    $('.bookmarklet').on('click', function(){
        displayModal('Information', 'Drag this link to your bookmarks toolbar, or right-click it and choose Bookmark This Link.', 'alert');
        return false;
    });

    // Modals.
    function displayModal(title, text, type, callback){
        $('body').append('<div id="overlay-modal" class="overlay animate-fade-in"><div class="container"><div id="modal-container" class="col-md-6 col-md-offset-3"></div></div></div>');
        var overlay = $('#modal-container');

        var html = '<div class="modal animate-from-top"><div class="modal-title">' + title + '</div>';
        if(text){
            html += '<div class="modal-body">' + text + '</div>';
        }
        html += '<div class="modal-footer clearfix">';

        switch(type){
            case 'alert':
                html += '<button class="button ripple pull-right modal-ok">Ok</button>';
                break;
            case 'confirm':
                html += '<button class="button ripple button-alert pull-right modal-ok">Ok</button><button class="button ripple pull-right modal-cancel">Cancel</button>';
                break;
        }

        overlay.html(html).closest('.overlay').show();

        $('#overlay-modal').on('click', function(event){
            var target = $(event.target);

            if(target.hasClass('modal-ok')){
                if(typeof callback === 'function'){
                    callback(true);
                }
                $('#overlay-modal').hide().remove();
            } else if(target.hasClass('modal-cancel') || target.hasClass('container') || target.attr('id') === 'modal-container' || target.attr('id') === 'overlay-modal'){
                if(typeof callback === 'function'){
                    callback(false);
                }
                $('#overlay-modal').hide().remove();
            }
        });
        initRippleEffect();
    }

    // Menu.
    $('.icon-unfold').on('click', function(){
        $('.header-main').toggleClass('unfold');
    });

    // Search overlay.
    $('#button-search').on('click', function(){
        var overlay = $('#search-overlay');
        overlay
            .addClass('visible animate-fade-in')
            .find('#searchform_value')
            .focus()
            .select();

        overlay
            .find('.content-fullscreen')
            .addClass('animate-from-top');
    });
    $('#search-overlay').on('click', function(event){
        if($(event.target).parents('#form-search').length === 0 && event.target.nodeName.toLowerCase() !== 'form'){
            animations.fadeOut($(this));
        }
    });
    $(document).on('keydown', function(event){
        if(event.keyCode === 27){
            var overlay = $('#search-overlay');
            animations.fadeOut(overlay);
        }
    });

    // Validation for tags search field.
    $('#button-filter').on('click', function(){
        var val = $('#searchform_value').val().trim();
        $('#tagfilter_value').val(val);
        $('#hidden-tag-form').submit();

        return false;
    });

    // Change date format for recent entries.
    if(shaarli.fromNow && (shaarli.fromNow === 'true' || shaarli.fromNow === '1')){
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

    // QR Code.
    $('.icon-qrcode').on('click', function(){
        var url = $(this).attr('href');
        var $imagePopup = $('#image-popup').first();
        var $overlay = $('#overlay').first();
        if(url && $imagePopup && $overlay){
            $imagePopup.html('<img src="' + url + '" alt="QR Code" />').fadeIn();
            $overlay.fadeIn();
        }

        // Disable original click event.
        return false;
    });
    $('#overlay,#image-popup').on('click', function(){
        $('#image-popup').fadeOut();
        $('#overlay').fadeOut();
    });

    // Material forms.
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

    // Material waves on buttons.
    var initRippleEffect = function(){
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

    initRippleEffect();
    

    // Autocomplete.
    var initAutocomplete = function($){
        if($('input[data-multiple]').length > 0){
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

    initAutocomplete(jQuery);

    var animations = {
        fadeIn: function(element){
            element.addClass('visible animate-fade-in');
        },
        fadeOut: function(element){
            element.removeClass('animate-fade-in')
                .addClass('animate-fade-out');

            setTimeout(function(){
                element.removeClass('animate-fade-out visible');
            }, 230);
        }
    };

    // Sortable plugins in admin.
    var plugins = $('.list-sortable').each(function(){
        var sortable = Sortable.create(this, {
            animation: 200,
            draggable: '.list-item-sortable',
            handle: '.handle',
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
});

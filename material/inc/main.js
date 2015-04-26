function confirmDeleteLink() { 
    return confirm("Are you sure you want to delete this link ?");
}

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

    // Menu.
    $('.icon-unfold').on('click', function(){
        $('.header-main').toggleClass('unfold');
    });

    // Search field for tags.
    $('#toolbar-button-filter').on('click', function(){
        var val = $('#searchform_value').val();
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

    // Hide empty thumbnails.
    /*$('.thumb').each(function(){
        if($(this).html().trim() === ''){
            $(this).remove();
        }
    });*/

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
});

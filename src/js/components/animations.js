import $ from 'jquery';

let animationEventName = 'animationend';

/**
 * Taken from: https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
 */
const checkAnimationSupport = function () {
  if (typeof isAnimationSupported !== 'undefined') {
    return isAnimationSupported;
  }

  let animation = false;
  let animationstring = 'animation';
  const domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
  let pfx = '';
  const elm = document.createElement('div');

  if (elm.style.animationName !== undefined) { animation = true; }

  if (animation === false) {
    for (let i = 0; i < domPrefixes.length; i++) {
      if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
        pfx = domPrefixes[i];
        animationstring = pfx + 'Animation';
        animation = true;
        break;
      }
    }
  }

  animationEventName = animationstring + 'end';
  return animation;
};

const isAnimationSupported = checkAnimationSupport();

const animations = {
  animation: function (animationName, element, callbackBegin, callbackEnd) {
    if (isAnimationSupported) {
      element.on(animationEventName + '.' + animationName, function () {
        // Removes this listener and animation classes.
        $(this).off(animationEventName + '.' + animationName)
          .removeClass(function (index, classes) {
            return (classes.match(/animate-\S+/g) || []).join(' ');
          });

        // Calls the specified callback if it exists.
        if (typeof callbackEnd === 'function') {
          callbackEnd();
        }
      });

      element.addClass('animate-' + animationName);
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
    } else {
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
      if (typeof callbackEnd === 'function') {
        callbackEnd();
      }
    }
  },
  fadeIn: function (element, callbackBegin, callbackEnd) {
    const realCallbackBegin = function () {
      element.removeClass('hidden');
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
    };

    this.animation('fade-in', element, realCallbackBegin, callbackEnd);
  },
  fadeOut: function (element, callbackBegin, callbackEnd) {
    const realCallbackEnd = function () {
      element.addClass('hidden');
      if (typeof callbackEnd === 'function') {
        callbackEnd();
      }
    };

    this.animation('fade-out', element, callbackBegin, realCallbackEnd);
  },
  slideFromTop: function (element, callbackBegin, callbackEnd) {
    const realCallbackBegin = function () {
      element.removeClass('hidden');
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
    };

    this.animation('slide-from-top', element, realCallbackBegin, callbackEnd);
  },
  slideFromRight: function (element, callbackBegin, callbackEnd) {
    const realCallbackBegin = function () {
      element.removeClass('hidden');
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
    };

    this.animation('slide-from-right', element, realCallbackBegin, callbackEnd);
  },
  hideSlideToBottom: function (element, callbackBegin, callbackEnd) {
    const realCallbackEnd = function () {
      element.addClass('hidden');
      if (typeof callbackEnd === 'function') {
        callbackEnd();
      }
    };

    this.animation('hide-slide-to-bottom', element, callbackBegin, realCallbackEnd);
  },
  showSlideFromBottom: function (element, callbackBegin, callbackEnd) {
    const realCallbackBegin = function () {
      element.removeClass('hidden');
      if (typeof callbackBegin === 'function') {
        callbackBegin();
      }
    };

    this.animation('show-slide-from-bottom', element, realCallbackBegin, callbackEnd);
  },
  compressHeight: function (element, callbackBegin, callbackEnd) {
    const realCallbackEnd = function () {
      element.addClass('hidden');
      if (typeof callbackEnd === 'function') {
        callbackEnd();
      }
    };

    this.animation('compress-height-50', element, callbackBegin, realCallbackEnd);
  }
};

export default animations;

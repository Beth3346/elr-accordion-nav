'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var $ = require('jquery');

var elrAccordionNav = function elrAccordionNav() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$containerClass = _ref.containerClass;
    var containerClass = _ref$containerClass === undefined ? 'elr-accordion-nav' : _ref$containerClass;
    var _ref$labelClass = _ref.labelClass;
    var labelClass = _ref$labelClass === undefined ? 'elr-accordion-nav-label' : _ref$labelClass;

    var contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
    var $container = $('.' + containerClass);
    var self = {
        toggle: function toggle($openContent, $openLabel) {
            var $that = $(this);
            var $nextContent = $that.next();

            if (!$nextContent.hasClass('active')) {
                $that.addClass('active');
                $nextContent.addClass('active');
            }

            $openLabel.removeClass('active');
            $openContent.removeClass('active');
        }
    };

    var getCurrentPage = function getCurrentPage(location, hash) {
        var startIndex = location.lastIndexOf('/') + 1;

        if (hash) {
            return '' + location.slice(startIndex) + hash;
        } else if (location.slice(0, 1) === '/') {
            return location.slice(startIndex);
        }

        return location;
    };

    var getCurrent = function getCurrent() {
        var location = window.location.pathname;
        var hash = window.location.hash;
        var currentPage = getCurrentPage(location, hash);
        var $target = $container.find('a[href="' + currentPage + '"]').addClass('active');

        if ($target.length) {
            return $target.closest('ul').parent('li');
        } else if (hash) {
            // if the hash doesn't exist in the menu remove it
            // and use the url instead
            return $container.find('a[href="' + location.slice(location.lastIndexOf('/') + 1) + '"]').addClass('active').closest('ul').parent('li');
        } else {
            return false;
        }
    };

    var showCurrent = function showCurrent() {
        var $currentList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if ($currentList) {
            $currentList.find('ul.active').removeClass('active');
            $currentList.find('ul').addClass('active');
        }

        return;
    };

    if ($container.length) {
        (function () {
            var $label = $container.find('.' + labelClass).parent('li').has('ul').children('a');
            var $content = $label.next('ul');
            var $currentList = getCurrent();

            if ($currentList) {
                $content.removeClass('active');
                $label.removeClass('active');
                showCurrent($currentList);
            }

            $(window).on('hashchange', function () {
                $container.find('a.active').removeClass('active');
                $content.removeClass('active');
                showCurrent(getCurrent());
            });

            $label.on('click', function (e) {
                // e.stopPropagation();
                e.preventDefault();

                var $openContent = $content.filter('.active');
                var $openLabel = $label.filter('.active');

                self.toggle.call(this, $openContent, $openLabel);
            });
        })();
    }

    return self;
};

exports.default = elrAccordionNav;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var $ = require('jquery');

var elrAccordionNav = function elrAccordionNav(params) {
    var self = {};
    var spec = params || {};
    var speed = spec.speed || 300;
    var containerClass = spec.containerClass || 'elr-accordion-nav';
    var expandIconClass = spec.expandIconClass || 'fa-plus';
    var collapseIconClass = spec.collapseIconClass || 'fa-minus';
    var iconClass = spec.iconClass || 'elr-accordion-icon';
    var contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
    var $container = $('.' + containerClass);

    var showDefaultContent = function showDefaultContent($expandedContent, $content) {
        $content.hide();
        $expandedContent.show();
    };

    var toggle = function toggle(speed, $openContent) {
        var $that = $(this);
        var $nextContent = $that.next();

        $openContent.slideUp(speed);

        if ($nextContent.is(':hidden')) {
            $nextContent.slideDown(speed);
        } else {
            $nextContent.slideUp(speed);
        }
    };

    var replaceIcons = function replaceIcons($openContent, iconClass, expandIconClass, collapseIconClass) {
        var $that = $(this);
        var $icon = $that.find('.' + iconClass);
        var $openContentIcons = $openContent.prev().find('.' + iconClass);

        if ($icon.hasClass(expandIconClass)) {
            $icon.removeClass(expandIconClass).addClass(collapseIconClass);
        } else {
            $icon.removeClass(collapseIconClass).addClass(expandIconClass);
        }

        $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
    };

    // remove the hash mark from a url hash
    var trimHash = function trimHash(hash) {
        return hash.slice(0, 1);
    };

    var getCurrent = function getCurrent() {
        var location = window.location.pathname;
        var hash = window.location.hash;
        var startIndex = location.lastIndexOf('/') + 1;
        var currentPage = void 0;
        var $target = void 0;
        var $currentList = void 0;

        if (hash) {
            currentPage = location.slice(startIndex) + hash;
        } else if (location.slice(0, 1) === '/') {
            currentPage = location.slice(startIndex);
        } else {
            currentPage = location;
        }

        $target = $container.find('a[href="' + currentPage + '"]').addClass('active');

        if ($target.length) {
            return $target.closest('ul').parent('li');
        } else if (hash) {
            // if the hash is not in the menu remove it and return the url
            currentPage = location.slice(startIndex);
            $target = $container.find('a[href="' + currentPage + '"]').addClass('active');

            return $target.closest('ul').parent('li');
        } else {
            return false;
        }
    };

    var showCurrent = function showCurrent($currentList) {
        // if ($currentList) {
        $currentList.find('ul').show();
        $currentList.find('.' + iconClass).removeClass(expandIconClass).addClass(collapseIconClass);
        // }

        // return;
    };

    if ($container.length) {
        (function () {
            var $label = $container.children('ul').children('li').has('ul').children('a');
            var $content = $label.next('ul');
            var $expandedContent = $container.find('.' + contentHolderClass + '[data-state=expanded]');
            var $currentList = getCurrent();
            var $icons = $label.find('.' + iconClass);

            if (!$currentList) {
                showDefaultContent($expandedContent, $content);
            } else {
                $content.hide();
                $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                showCurrent($currentList);
            }

            $(window).on('hashchange', function (e) {
                e.preventDefault();

                $container.find('a.active').removeClass('active');
                $currentList = getCurrent();
                $content.hide();
                $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                showCurrent($currentList);
            });

            $label.on('click', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var $openContent = $($content).not(':hidden');

                toggle.call(this, speed, $openContent);
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
            });
        })();
    }

    return self;
};

exports.default = elrAccordionNav;
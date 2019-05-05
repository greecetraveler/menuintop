/**
 * Simple Sticky Header
 *
 * More info: https://github.com/oenstrom/simple-sticky-header/
 *
 * @author Olof Enström
 * @version 0.9.0
 * @copyright Olof Enström 2017
 * @license GPL-3.0+
 * https://github.com/oenstrom/simple-sticky-header/blob/master/LICENSE
 */
(function($) {
    $.fn.simpleStickyHeader = function(options) {
        var that = this;
        var headerOffsetTop = that.offset().top;

        var settings = $.extend({
            class: "sticky-header"
        }, options);

        var toggleFixedClass = (function toggleFixed() {
            that.toggleClass(settings.class, $(window).scrollTop() >= headerOffsetTop);
            return toggleFixed;
        })();

        $(window).scroll(toggleFixedClass);

        return this;
    };
}(jQuery));

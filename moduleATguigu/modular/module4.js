/**
 * IIFE增强模式:引入依赖
 */
(function (win, $) {
    let msg = "module4";

    function foo() {
        console.log("foo()", msg);
    }

    win.module4 = foo;
    $("document").ready(function () {
        $("body").css('background', 'red');
    })
})(window, jQuery);
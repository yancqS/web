/*
* IIFE:闭包
* */
(function (win) {
    let msg = "message";
    function foo() {
        console.log("foo()",msg);
    }
    win.module3 = {foo}
})(window);
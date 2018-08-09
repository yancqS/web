//定义没有依赖的模块

define(function (require, exports, module) {
    let msg = "foo__module1";

    function foo() {
        console.log(msg);
    }

    exports.foo1 = {foo};
});
//定义一个有依赖的模块

define(function (require, exports, module) {
    let msg = "fun2__module4";

    //同步引入
    let module2 = require("./module2");
    console.log(module2.bar());

    //异步引入
    require.async("./module1", function (m1) {
        m1.foo1.foo();
    });

    function fun2() {
        console.log(msg);
    }

    exports.fun2 = fun2;
});
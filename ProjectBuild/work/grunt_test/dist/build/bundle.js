"use strict";

(function () {
    function foo(num1, num2) {
        return num1 + num2;
    }
    console.log(foo(2, 4));
    alert("foo(change)");
})();;(function () {
    var arr = [1, 3, 15, 2, 8, 9];
    var res = arr.map(function (item) {
        return item > 6 ? "及格" : "不及格";
    });
    console.log(res);
})();

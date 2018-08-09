(function () {
    function foo(num1, num2) {
        return num1 + num2;
    }
    console.log(foo(2,4));
    alert("foo(change)");
})();;(function () {
    let arr = [1, 3, 15, 2, 8, 9];
    let res = arr.map(item => item > 6 ? "及格" : "不及格");
    console.log(res);
})();
(function () {
    let arr = [1, 3, 15, 2, 8, 9];
    let res = arr.map(item => item > 6 ? "及格" : "不及格");
    console.log(res);
})();
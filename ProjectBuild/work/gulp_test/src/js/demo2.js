(function () {
    let arr = [1, 3, 6, 7, 9, 3, 2];
    let res = arr.map(item => item > 6 ? "及格" : "不及格");
    console.log(res);
})();
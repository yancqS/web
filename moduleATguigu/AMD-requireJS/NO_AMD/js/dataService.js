//定义一个没有依赖的模块
(function (window) {
    let name = "dataServiceJS";
    function getname() {
        return name;
    }
    window.dataService = {getname}
})(window);
//定义一个有依赖的模块
(function (window,dataService) {
    let msg = "alertJS";
    function showmsg() {
        console.log(msg,dataService.getname());
    }
    window.alerter = {showmsg}
})(window,dataService);
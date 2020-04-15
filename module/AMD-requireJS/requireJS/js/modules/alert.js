//定义有依赖的模块

define(["DS","angular"],function (dataService,angular) {
    let msg = "alerter.js";
    function showmsg() {
        console.log(msg,dataService.getName());
        console.log(angular);
    }
    return {showmsg}
});
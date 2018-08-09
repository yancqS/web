define(function (require, exports, module) {
    let msg = "bar__module2";

    function bar() {
        return msg;
    }

    module.exports = {bar};
});
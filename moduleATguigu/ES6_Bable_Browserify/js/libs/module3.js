"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var msg = "default module3";
    console.log(msg);
};

exports.cus = cus;
function cus() {
    console.log("cus() module3");
} //默认暴露
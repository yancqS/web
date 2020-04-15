//引入其他模块
//语法 import XXX from "path"

import $ from "jquery";

import {foo,bar,arr} from "./module1";
import {fun,fun2} from "./module2";
import customName, {cus} from "./module3";

$("body").css("background","#ccc");
foo();
bar();
fun();
fun2();
console.log(arr);
customName();
cus();


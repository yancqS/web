//实验path模块
const pathLib = require('path');

let str = 'E:\\jiaoben4869\\js\\demo.js';

let obj = pathLib.parse(str);
//base 文件名部分+扩展名
//ext  扩展名部分
//name 文件名
//dir  路径
console.log(obj);
/*{root:'E:\\',
   dir:'E:\\jiaoben4869\\js',
   base:'demo.js',
   ext:'.js',
   name:'demo'}*/
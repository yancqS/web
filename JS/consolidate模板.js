/*
By Yan
2017.11.4
*/
const express = require('express');
const expressStatic = require('express-static');
const fs = require('fs');
const multer = require('multer');/*会抛出错误：cannot find module 'readable-stream' 解决办法:用cnpm 下载安装：cnpm install multer*/
const consolidate = require('consolidate');//模板整合
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const pathLib = require('path');

let server = express();
server.listen(8888);
//解析cookie
server.use(cookieParser());
//解析session 
let arr = [];
for(let i = 0;i<100000;i++){
	arr.push("sig_"+Math.random());
}
server.use(cookieSession({
	name:"session_Yan",
	keys:arr,//keys是必选的，不能为空
	maxAge:20*24*3600*1000
}));
//解析post文件、解析post数据
server.use(multer({dest:"../www/upload/"}).any());
server.use(bodyParser.urlencoded({extended:false}));
//配置模板引擎
//1输出什么东西
server.set('view engine','html');
//2模板文件放在哪
server.set('views','../views');
//3用哪种模板引擎
server.engine('html',consolidate.ejs);

// 接受用户请求
server.use('/',function(req,res){
	res.render('test.ejs');
});
console.log("success run at localhost:8888");
//静态数据
server.use(expressStatic('../www'));


















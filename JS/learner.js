const express = require('express');
const expressStatic = require('express-static');
const fs = require('fs');
const multer = require('multer');//解析post文件
const consolidate = require('consolidate');//模板整合
const bodyParser = require('body-parser');//解析post数据
const cookieParser = require('cookie-parser');//解析cookie
const cookieSession = require('cookie-session');//解析session
const pathLib = require('path');//解析路径path.js
const mysql = require('mysql');//操作mysql数据库
const expressRoute = require('express-route');
const common = require('./MD5');


let server = express();
server.listen(8888);

//1.请求数据 get数据自带(req.query)
server.use(bodyParser.urlencoded({extended:false}));//解析post数据
const mulOBJ = multer({dest:'../www/upload'});
server.use(mulOBJ.any());//k解析post文件




//2.cookie、session
server.use(cookieParser());
(function(){
	let arr = [];
for(let i=0;i<100000;i++){
	arr.push("keys_"+Math.random());
}
server.use(cookieSession({
	name:'sess_id',
	keys:arr,
	maxAge:20*3600*1000
  }));
})();







//3.模板引擎
server.set('view engine','html');
server.set('views','../views');
server.engine('html',consolidate.ejs);




//4.route
server.use('/admin',require('./template/admin')());

server.use('/',require('./template/web')());







//5.静态数据
server.use(expressStatic('../www'));
console.log('success run at localhost:8888');













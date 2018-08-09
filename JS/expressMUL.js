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
server.listen(8080);
//解析post数据
server.use(bodyParser.urlencoded({extended:false}));
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
//解析post文件
server.use(multer({dest:"../www/upload/"}).any());
//用户请求
server.use('/',function(req,res){
	res.cookie('user','Yan',{path:'/'});
	//console.log(req.query,req.body,req.cookies,req.session);
	//console.log(req.files);//获取上传文件信息
	//1.获取原始的文件名(可以看path.js)
	let newname = req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
    //2.重命名 
    fs.rename(req.files[0].path,newname,function(err){
		if(err){
			res.send("<h1>"+'UPLOAD FAIL'+"</h1>");
			console.log(err);
		}else{
	        res.send("<h1>"+"UPLOAD SUCCESS"+"</h1>");
			console.log(newname);
		}
	});
 });
//静态数据
server.use(expressStatic('../www'));
console.log("success run at localhost:8080");
/*
body-parser	解析post数据	application/x-www-form-urlencoded
server.use(bodyParse.urlencode());
	req.body



multer		解析post文件	multipart/form-data
let obj=multer({dest: 'upload/'});

server.use(obj.any());

server.use(function (req, res){
	req.files[0].originalname
	req.files[0].path
});

把扩展名加上
		//'upload/aadfaew324we34' + '.txt'
		//'upload/aadfaew324we34.txt'
let newName=file.path+pathLib.parse(file.originalname).ext;

fs.rename(老名, 新名, function (err){});
*/


















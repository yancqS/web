/*
By Yan
2017.11.7
*/
const express = require('express');
const expressStatic = require('express-static');
const fs = require('fs');
const multer = require('multer');//解析post文件/*会抛出错误：cannot find module 'readable-stream' 解决办法:用cnpm 下载安装：cnpm install multer*/
const consolidate = require('consolidate');//模板整合
const bodyParser = require('body-parser');//解析post数据
const cookieParser = require('cookie-parser');//解析cookie
const cookieSession = require('cookie-session');//解析session
const pathLib = require('path');
const mysql = require('mysql');//操作mysql数据库
const common = require('./common.js');//引入自己写的模块：将毫秒转为正常时间


let server = express();
server.listen(8888);
//连接数据库
const db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'blog'});
//解析cookie
server.use(cookieParser());
//解析session 
let arr = [];
for(let i = 0;i<100000;i++){
	arr.push("keys_"+Math.random());
}
server.use(cookieSession({
	name:"session_Yan",	
	keys:arr,//keys是必选的，不能为空
	maxAge:20*24*3600*1000
}));
//解析post文件、解析post数据
server.use(multer({dest:"../www/upload/"}).any());
server.use(bodyParser.urlencoded({extended:false}));
//模板引擎
server.set('view engine','html');
server.set('views','../views');
server.engine('html',consolidate.ejs);


//用户请求
server.get('/',(req,res,next)=>{
	db.query('SELECT * FROM banner_table',(err,data)=>{
		if(err){
			res.status(500).send('database error').end();
		}else{
			res.banners = data;
			next();
		}
	});
	
});


server.get('/',(req,res,next)=>{
		db.query('SELECT ID,title,summary FROM article_table',(err,data)=>{
			if(err){
			  res.status(500).send('database error').end();
			}else{
			  res.articles = data;	
			  next();
			}
		});
	});


server.get('/',(req,res)=>{
	res.render('index.ejs',{banners:res.banners,articles:res.articles});
	//console.log(res.banners,res.news);
});


server.get('/articles',(req,res)=>{
	if(req.query.ID){
		if(req.query.act==='like'){
		  db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.ID}`,(err,data)=>{
			if(err){
				res.status(500).send('database error').end();
			}else{
				//显示文章
				db.query(`SELECT * FROM article_table WHERE ID=${req.query.ID}`,(err,data)=>{
		            if(err){
		  	           res.status(500).send('database error').end();
		            }else{
                       if(data.length===0){
		  		       res.status(404).send('article NOT FOUND').end();
		  	           }else{
                           let article_data = data[0];
		  		           article_data.postData = common.time2data(article_data.post_time);
		  		           article_data.content = article_data.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
		  		           res.render('conText.ejs',{articles:article_data});
		  	           }
		            }
	            });
			  }
		   });
	     }else{
			//显示文章
			db.query(`SELECT * FROM article_table WHERE ID=${req.query.ID}`,(err,data)=>{
		      if(err){
		  	    res.status(500).send('database error').end();
		      }else{
                 if(data.length===0){
		  		 res.status(404).send('article NOT FOUND').end();
		  	  }else{
                 	let article_data = data[0];
                 	article_data.postData = common.time2data(article_data.post_time);
                 	article_data.content = article_data.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
                 	res.render('conText.ejs',{articles:article_data});
                 }
		      }
			});
		 }
    }else{
		res.status(404).send('article NOT FOUND').end();
	}
});
console.log("success run at localhost:8888");
//静态数据
server.use(expressStatic('../views'));









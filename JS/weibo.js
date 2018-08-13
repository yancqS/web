/*
* nodeJS angularWeiBo.html 接口
* By YANcq
* 2017.11.30
* */
const express = require('express');//引入express框架
const expressStatic = require('express-static');//读取静态文件
//const fs = require('fs');//文件操作
//const multer = require('multer');//解析post文件/*会抛出错误：cannot find module 'readable-stream' 解决办法:用cnpm 下载安装：cnpm install multer*/
//const consolidate = require('consolidate');//模板整合
//const bodyParser = require('body-parser');//解析post数据
//const cookieParser = require('cookie-parser');//解析cookie
//const cookieSession = require('cookie-session');//解析session
//const pathLib = require('path');//解析路径
const mysql = require('mysql');//操作mysql数据库

let server = express();//启动服务器
server.listen(8888);//监听端口
//连接数据库
const db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'weibo'});
//响应访问/page 接口
server.use('/page',(req,res)=>{
  switch (req.query.act){
      //添加
      case 'add':
          let dataTime = new Date().getTime();
          //判断发表评论是否为空
          if(req.query.content!=='undefined'&&req.query.content!==''){
              db.query(`INSERT INTO comment_table (content,time) VALUE ('${req.query.content}','${dataTime}')`,(err,data)=>{
                  if(err){
                      res.status(500).send('databasess error').end();
                  }else{
                      //查询页面数据并返回给客户端
                      db.query(`SELECT * FROM comment_table ORDER BY time DESC`,(err,data)=>{
                          if(err){
                              console.log(err);
                              res.status(500).send('database error').end();
                          }else{
                              res.send(data);
                          }
                      });
                  }
              });
          }else{
              //查询页面数据并返回给客户端
              db.query(`SELECT * FROM comment_table ORDER BY time DESC`,(err,data)=>{
                  if(err){
                      console.log(err);
                      res.status(500).send('database error').end();
                  }else{
                      res.send(data);
                  }
              });
          }
          break;
      case 'get_page_count':
          //获取页数
          let count_szie=4;
          db.query(`SELECT COUNT(*) FROM comment_table`,(err,data)=>{
              if(err){
                  console.error(err);
                  res.status(500).send("database error").end();
              }else{
                  for(let count in data[0]){
                      let page_count = data[0][`${count}`];//获取评论数量
                      let pages = parseInt(page_count/count_szie)+1;
                      res.send(`${pages}`);
                  }
              }
          });
          break;
      case 'get':
          //获取某一页面的数据
          if(req.query.page<1){
              req.query.page=1;
          }
          let start = (req.query.page-1)*4;//该页在那一条评论开始显示，一页显示4个评论
          db.query(`SELECT * FROM comment_table ORDER BY time DESC LIMIT ${start},4`,(err,data)=>{
              if(err){
                  console.log(err);
                  res.status(500).send('database error').end();
              }else{
                  res.send(data);
              }
          });
          break;
      case 'acc':
          //点赞
          db.query(`UPDATE comment_table SET acc=acc+1 WHERE ID=${req.query.ID}`,(err,data)=>{
              if(err){
                  console.error(err);
                  res.status(500).send('database error').send();
              }else{
                  db.query(`SELECT * FROM comment_table ORDER BY time DESC`,(err,data)=>{
                      if(err){
                          console.log(err);
                          res.status(500).send('database error').end();
                      }else{
                          res.send(data);
                      }
                  });
              }
          });
          break;
      case 'ref':
          //踩
          db.query(`UPDATE comment_table SET ref=ref+1 WHERE ID=${req.query.ID}`,(err,data)=>{
              if(err){
                  console.error(err);
                  res.status(500).send('database error').send();
              }else{
                  db.query(`SELECT * FROM comment_table ORDER BY time DESC`,(err,data)=>{
                      if(err){
                          console.log(err);
                          res.status(500).send('database error').end();
                      }else{
                          res.send(data);
                      }
                  });
              }
          });
          break;
      case 'del':
          //删除评论
          db.query(`DELETE FROM comment_table WHERE ID=${req.query.ID}`,(err,data)=>{
              if(err){
                  console.error(err);
                  res.status(500).send('database error').end();
              }else{
                  res.send(data);
              }
          });
          break;
      default:
          console.log('JUST DO IT');
          break;
  }
});
console.log('success run at localhost:8888');
server.use(expressStatic('/'));

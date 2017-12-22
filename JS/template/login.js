const express = require('express');
const common = require('../MD5');
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'learner'});

module.exports=function(){
    let router = express.Router();
	
	router.get('/',(req,res)=>{
		  res.render('admin_login.ejs',{});
});
    router.post('/',function(req,res){
        let username = req.body.username;
        let password = common.md5(req.body.password+common.MD5_SUFFIX);
	   db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
		  if(err){
			  console.log(err);
			  res.status(500).send('database error').end();
		  }else{
			  if(data.length===0){
				  res.status(400).send('no this admin').end();
			  }else{
				  if(data[0].password===password){
					  req.session['admin_id'] = data[0].ID;
					  res.redirect('/admin');
					  //console.log('success login YAN');
				  }else{
					  res.status(404).send('password error').end();
				  }
			  }
		  }
       })
    });
	
	return router;
};
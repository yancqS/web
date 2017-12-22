const express = require('express');
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'learner'});


module.exports=function(){
    let router = express.Router();
         
	  router.use('/get_banners',(req,res)=>{
		  db.query('SELECT * FROM banner_table',(err,data)=>{
			  if(err){
				  res.status(500).send('database error').end();
			  }else{
				  res.send(data);
			  }
		  })
	  });
      return router;
    };

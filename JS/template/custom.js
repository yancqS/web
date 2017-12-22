const express = require('express');
const mysql = require('mysql');
const common = require('../MD5');
const pathLib = require('path');
const fs = require('fs');
/**
 *
 * 这个文件最大的问题在于 'callback hell' 嵌套太多 应该用KOA框架+generator函数（async+await）+CO模块 + Thunkify框架
 */


let db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'learner'});

module.exports = function(){
	let router = express.Router();
	
	router.get('/',(req,res)=>{
		switch(req.query.act){
			case "mod":
				db.query(`SELECT * FROM custom_evalution_table WHERE ID=${req.query.id}`,(err,moddata)=>{
					if(err){
						console.error(err);
						res.status(500).send('database error').end();
					}else{ 
						if(moddata.length===0){
						res.status(404).send('data is not found').end();
					}else{
						db.query('SELECT * FROM custom_evalution_table',(err,evalution)=>{
							if(err){
								console.error(err);
						        res.status(500).send('database error').end();
							}else{
							    res.render('custom.ejs',{title:'用户评价',mod_data:moddata[0],evalution_data:evalution});
							}
						 });
					   }
					 }
				 });
				break;
			case "del":
				db.query(`SELECT * FROM custom_evalution_table WHERE ID=${req.query.id}`,(err,data)=>{
					if(err){
						console.error(err);
						res.status(500).send('database error').end();
					}else{
						if(data.length===0){
							res.status(404).send('cannot found custon evalution').end();
						}else{
							fs.unlink('../www/upload/'+data[0].src,(err)=>{
								if(err){
									console.error(err);
									res.status(500).send('file operation error').end();
								}else{
									db.query(`DELETE FROM custom_evalution_table WHERE ID=${req.query.id}`,(err,data)=>{
					                   if(err){
						                 console.error(err);
						                 res.status(500).send('database error').end();
					                   }else{
						                 res.redirect('/admin/custom');
					                }
				                  });
								}
							 });
						  }
					  }
				  });
				break;
			default:
				db.query('SELECT * FROM custom_evalution_table',(err,evalution)=>{
			     if(err){
				   console.error(err);
				   res.status(500).send('database error').end();
			     }else{
				   res.render('custom.ejs',{title:'用户评价',evalution_data:evalution});
			     }
		      });
			   break;
		 }
	});
	
	router.post('/',(req,res)=>{
		let title = req.body.title;
        let description = req.body.description;
		if(req.files){
            let oldpath = req.files[0].path;
            let newpath = req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
            let newname = req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;
		}else{
            let newname = null;
		}
		
		if(newname){
			fs.rename(oldpath,newpath,(err)=>{
			  if(err){
				res.status(500).send('file operation error').end();
			  }else{
				if(!title || !description || !newname){
			       res.status(400).send('arg error11').end();
		        }else{
			       if(req.body.mod_id){//修改
				      db.query(`SELECT * FROM custom_evalution_table WHERE ID=${req.body.mod_id}`,(err,data)=>{
					    if(err){
						  console.error(err);
						  res.status(500).send('database error').end();
					    }else{
						  if(data.length===0){
							res.status(404).send('old file is not found').end();
						  }else{
							fs.unlink('../www/upload/'+data[0].src,(err)=>{
								if(err){
									console.error(err);
									res.status(500).send('file operation error').end();
								}else{
									db.query(`UPDATE custom_evalution_table SET title='${req.body.title}',description='${req.body.description}',src='${newname}' WHERE ID=${req.body.mod_id}`,(err,moddata)=>{
					                     if(err){
						                     console.error(err);
						                     res.status(500).send('database error').end();
					                     }else{
						                     res.redirect('/admin/custom');
					                   }
				                   });
								}
							});
						}
					}
				});
			}else{//添加
				db.query(`INSERT INTO custom_evalution_table (title,description,src) VALUE ('${title}','${description}','${newname}')`,(err,adddata)=>{
					if(err){
						console.error(err);
						res.status(500).send('database error').end();
					}else{
						res.redirect('/admin/custom');
					}
				 });
			   }
		     }
	       }
		});
	  }else{
			if(!title || !description ){
			       res.status(400).send('arg error22').end();
		    }else{
			    if(req.body.mod_id){//修改
				db.query(`UPDATE custom_evalution_table SET title='${req.body.title}',description='${req.body.description}' WHERE ID=${req.body.mod_id}`,(err,moddata)=>{
					if(err){
						console.error(err);
						res.status(500).send('database error').end();
					}else{
						res.redirect('/admin/custom');
					}
				});
			}else{//添加
				db.query(`INSERT INTO custom_evalution_table (title,description,src) VALUE ('${title}','${description}','${newname}')`,(err,adddata)=>{
					if(err){
						console.error(err);
						res.status(500).send('database error').end();
					}else{
						res.redirect('/admin/custom');
					}
				 });
			   }
		     }
		   }
	    });
	
	return router;
};
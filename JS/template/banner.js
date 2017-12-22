const express = require('express');
const mysql = require('mysql');


let db = mysql.createPool({host:'localhost',user:'root',password:'YANchongqing.910',database:'learner'});

module.exports=function(){
	let router = express.Router();
	router.get('/',(req,res)=>{
		  switch(req.query.act){
			  case "mod":
				  db.query(`SELECT * FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
					  if(err){
						  res.status(500).send('database error').end();
					  }else if(data.length===0){
						  res.status(404).send('data is not found').end();
					  }else{
						  db.query('SELECT * FROM banner_table',(err,banners)=>{
							  if(err){
								  res.status(500).send('database error').end();
							  }else{
								 res.render('banners.ejs',{title:'banner管理',mod_data:data[0],banner_data:banners});
							  }
						  });
					  }
				  });
				  break;
			  case "del":
				  db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
					if(err){
						res.status(500).send("database error").end();
					}else{
						res.redirect('/admin/banners');
					}  
				  });
				  break;
			  default:
				  db.query('SELECT * FROM banner_table',(err,data)=>{
			        if(err){
				      res.status(500).send('database error').end();
				      console.log(err);
			      }else{
				      res.render('banners.ejs',{title:'banner管理',banner_data:data}); 
			   }
		    })
		  }
	   });
	  router.post('/',(req,res)=>{
		  let title = req.body.title;
		  let description = req.body.description;
		  let href = req.body.href;
		  if(!title || !description || !href){
			  res.status(400).send('arg error').end();
		  }else{
			  if(req.body.mod_id){//修改
				  db.query(`UPDATE banner_table SET title='${req.body.title}',description='${req.body.description}',href='${req.body.href}' WHERE ID=${req.body.mod_id}`,(err,data)=>{
					  if(err){
						  console.log(err);
						  res.status(500).send("database error").end();
					  }else{
						  res.redirect('/admin/banners');
					  }
				  });
			  }else{//添加
				  db.query(`INSERT INTO banner_table (title,description,href) VALUE ('${title}','${description}','${href}')`,(err,data)=>{
				  if(err){
					  console.log(err);
					  res.status(500).send('database error').end();
				  }else{
					  res.redirect('/admin/banners');
				  }
			    });
			  }
		  }
	  });
	return router;
};



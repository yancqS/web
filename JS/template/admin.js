const express = require('express');


module.exports=function(){
      let router = express.Router();
	  //检查登录状态  
	  router.use(function(req,res,next){
		  if(!req.session['admin_id'] && req.url !=='/login' ){
			  res.redirect('/admin/login');
		  }else{
			  next();
		  }
	  });
	
	  router.use('/banners',require('./banner')());
	
	  router.use('/login',require('./login')());
	
	  router.use('/custom',require('./custom')());
	
	  router.get('/',function(req,res){
		  res.render('admin_index.ejs',{title:'管理主页'});
	  });
      return router;
    };












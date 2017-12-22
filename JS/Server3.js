const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');
let users = {}; //{"blue": "123456", "zhangsan": "123456", "lisi": "321321"}

http.createServer(function(req,res){
	let str = '';
	req.on('data',function(data){
		str+=data;
	});
	req.on('end',function(){//‘end’ 数据传输完成结束时触发的事件
	    let obj = urlLib.parse(req.url,true);
	    const url = obj.pathname;//地址
	    const GET = obj.query;//数据
		const POST = querystring.parse(str);
		//fs读取文件
	   //区分请求的是接口、文件 
	   if(url==='/user'){//接口
	      switch(GET.act){
		    case 'reg':
		   /*
		   1 检查用户名是否已经存在
		   2 插入users
		   */
		   if(users[GET.user]){
			   res.write('{"ok":false,"msg":"The username has been register"}');
		   }else{
			   users[GET.user]=GET.pass;
			   res.write('{"ok":true,"msg":"register successfully"}');
		   }
		    break;
		   case 'login':
		   /*
		   1 检查用户是否存在
		   2 检查用户密码		   */
		   if(users[GET.user]===null){
			   res.write('{"ok":false,"msg":"The user in not exist"}');
		   }else if(users[GET.user]!==GET.pass){
			   res.write('{"ok":false,"msg":"username or password is error"}');
		   }else{
			   res.write('{"ok":true,"msg":"login successfully"}');
		   }
		    break;
		   default:
		    res.write('{"ok":false,"msg":"Unkown error"}');
		    break;
	   } 
	   res.end();
	  }else{//文件
		let file_name = '../www'+url;
	    fs.readFile(file_name,function(err,data){
		if(err){
			res.write('404');
		}else{
			res.write(data);
		  } 
			res.end();                                     
	    });  
	  }
   });
}).listen(8888);










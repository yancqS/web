const express = require('express');
const expresStatic = require('express-static');
let server = express();
let users = {
	'yan':'123456',
	'zhangsan':'987654',
	'lisi':'123'
};
server.listen(8888);
server.use('/login',function(req,res){
	let user = req.query['user'];
	let pass = req.query['pass'];
	if(users[user]===null){
		res.send({'ok':false,'msg':'用户不存在'});
	}else if(users[user]!==pass){
		res.send({'ok':false,'msg':'密码错误'});
	}else{
		res.send({'ok':true,'msg':'登陆成功'});
	}
});
server.use(expresStatic('../www'));
console.log("running success at localhost:8888");
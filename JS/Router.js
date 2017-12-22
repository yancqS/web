const express = require('express');

let server = express();
server.listen(8888);
//路由Router
let routerUser = express.Router();
server.use('/user',routerUser);
routerUser.get('/1.html',function(req,res){ //http://XXXX.com/user/1.html
	res.send('USER1');
});
routerUser.get('/2.html',function(req,res){ //http://XXXX.com/user/2.html
	res.send('USER2');
});
console.log('welcom to visit localhost:8888/user/');
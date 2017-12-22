const mysql = require('mysql');
//连接到mysql数据库
let db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'YANchongqing.910',
	database:'20171106'
});
//查询query(什么操作，回调函数)；
db.query('SELECT * FROM user_table',(err,data)=>{
	if(err)
		console.log('FAIL',err);
	else
		console.log('SUCCESS',JSON.stringify(data));
});



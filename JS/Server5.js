const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8888);
server.use(cookieParser('dsaxcv'));
server.use('/sublocal',function(req,res){
	req.secret='dsaxcv';
	res.cookie('userID','yancq',{path:'/sublocal',maxAge:30*24*3600*1000,signed:true});
	res.send('welcome to my website');
	console.log('未签名版:',req.cookies);//逗号，不是加号
	console.log('签名版:',req.signedCookies);
	/*
	console.log('签名版:'+req.signedCookies);在控制台会报错：can not covert object to primitive value.<If you use console.log("foo" + object) nodejs will try to convert the obeject into a string. Simply do  console.log(object)>
	*/
});
console.log('run success at localhost:8888');
/*
userID	s%3Ayancq.0HjXzQhvCh1rmnaz%2BHSpVFrNxBRYoCyp9AS13N2XjM8		
*/
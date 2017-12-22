const http = require('http');
const urlLib = require('url');
http.createServer(function(req,res){
	let obj = urlLib.parse(req.url,true);
	let url = obj.pathname;
	let GET = obj.query;
	console.log(url,GET);
	res.write("hello");
	res.end();
}).listen(8888);
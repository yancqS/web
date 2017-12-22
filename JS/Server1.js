const http = require("http");//加载http 模块
const querystring = require("querystring");//加载querystring 模块
http.createServer(function(req,res){
    let GET = {};
    if(req.url.indexOf('?')!==-1){
		let arr = req.url.split('?');
		let url = arr[0];
		let GET = querystring.parse(arr[1]);
	}else{
		let url = req.url;
	}
	console.log(url,GET);
	res.write("hello yan");
	res.end();
}).listen(8888);
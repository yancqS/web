const http = require('http');
http.createServer(function(req,res){
	//console.log(req.url);
	var GET = {};
	if(req.url.indexOf('?')!=-1){/*判断在请求地址中是否有“？” 如 localhost：8888/aaa?user=yan&pass=123456
	         req.url = /aaa?user=yan&pass=123456
	        /aaa => 地址
	        user=yan&pass=123456 => 数据*/
		var arr = req.url.split('?');
	    var url = arr[0];
	    var arr1 = arr[1].split('&');
	    for(var i=0;i<arr1.length;i++){
	    	var arr2 = arr1[i].split('=');
	    	GET[arr2[0]]=arr2[1];
	    }
	}else{
		var url = req.url;
	}
	console.log(GET,url);
	res.write("hello form");
	res.end();
}).listen(8888);
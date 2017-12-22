const jade = require('jade');
const fs = require('fs');

var str = jade.renderFile('../views/test.jade',{pretty:true});
fs.writeFile("../www/jade.html",str,function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log("success do it");
	}
})
console.log(str);
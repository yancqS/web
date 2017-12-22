const ejs = require('ejs');
ejs.renderFile('../views/test.ejs',{},function(err,data){
	console.log(data);
});
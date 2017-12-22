let student = require('./student');
let teacher = require('./teacher');

function add(teacherName,students){
	teacher.add(teacherName);
	students.forEach(function(item,index){
		student.add(item);
	});
}

exports.add = add;
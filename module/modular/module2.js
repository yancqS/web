/*
* namespace模式 简单对象封装
* */
let obj = {
    msg:'message',
    foo(){
        console.log("foo()",this.msg)
    },
    bar(){
        console.log("bar()",this.msg);
    }
};
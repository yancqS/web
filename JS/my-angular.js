window.onload=function (){
  let aEle=document.getElementsByTagName('*');//获取页面中所有元素(标签)
  let arrApp=[];//创建一个空数组
    /**
     * 例如下面这一段html文件
     * <!DOCTYPE html>
      <html>
       <head>
        <meta charset="utf-8">
        <title></title>
        <style media="screen">
          .box {width:200px; height:200px; background:#CCC}
        </style>
        <script src="my-angular.js" charset="utf-8"></script>
       </head>
       <body>
       <div ng-app="">
        <input type="text" ng-model="a">
        <input type="text" ng-model="a">
        <input type="text" ng-model="b">
        <div class="box" ng-bind="a*b"></div>
       </div>
       </body>
     </html>
     * */
    //遍历所获得的页面元素(标签)，并且找到有ng-app属性的标签arrApp数组中
  for(let i=0;i<aEle.length;i++){
    if(aEle[i].getAttribute('ng-app')!==undefined){
      arrApp.push(aEle[i]);//以以上html文件为例:arrApp=['div']
    }
  }

  //处理ng-app
    //遍历arrApp数组
  arrApp.forEach(app=>{
    //findDirective函数是为了找到带有ng-*这样属性的标签
    function findDirective(directive){
      let arr=[];//建立一个空数组
        //遍历具有ng-app属性的标签内部的所有标签,以以上html文件为例:['input', 'input' 'input', 'div']
      Array.from(app.getElementsByTagName('*')).forEach(ele=>{
        let str=ele.getAttribute(directive);//获取标签的ng-*属性值
          //如果存在该属性,那么把属性值以及标签名{}(json)放入arr数组
        if(str){
          arr.push({name: str, ele});//以ng-model 为例:[{name:'a',input:'input'},{name:'a',input:'input'},{name:'b',input:'input'}]
        }
      });

      return arr;//返回包含属性值以及标签名{}(json)的数组
    }

      let $scope={};//建立一个空json

      //找到所有的ng-model
      let models=findDirective('ng-model');//[{name:'a',input:input}, {name:'a',input:input}, {name:'b',input:input}]
      // ng-bind
      let binds=findDirective('ng-bind');//[{name:'a*b',div:div}]
    //数据->html
    function apply(){
      for(let Name in $scope){//遍历$scope(Json)
        models.forEach(json=>{//遍历models(Array)
          if(json.name===Name){
            json.ele.value=$scope[Name];//实现双向绑定(例如：把值扩散给每一个具有ng-model='a'的标签)
          }
        });
        //binds:[{name:'a*b',div:div}]
        binds.forEach(json=>{
          let str=json.name;//str = 'a*b'
          //如果直接eval(str): a is not defined, b is not difined.这是因为a 和 b 存放在$scope(json)里面
          for(let name in $scope){
            str=str.replace(new RegExp(name, 'g'), `$scope.${name}`);//利用正则,替换a, b 为 $scope.a 和 $scope.b
          }
          //例外处理语句 : 因为在先输入a 的值得时候，还没输入b 的值， 控制台会报错
          try{
            json.ele.innerHTML=eval(str);//首先执行
          }catch(e){ //发生错误之后执行
            json.ele.innerHTML='';
          }
        });
      }
    }

    //html->数据 models: [{name:'a',input:input},{name:'a',input:input},{name:'b',input:input}]
    models.forEach(json=>{
      json.ele.oninput=function (){
        $scope[json.name]=this.value;//$scope:{a:值,b:值}
        apply();
      };
    });
  });
};

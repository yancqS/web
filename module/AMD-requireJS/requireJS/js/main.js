(function () {

    require.config({
        paths:{
            DS:"./modules/dataService",//不需要加js后缀，因为require会自动加，加了报错
            alert:"./modules/alert",
            jquery:"./libs/jquery-3.1.1",
            angular:"./libs/angular"
        },
        shim:{
            angular:{
                exports:'angular'
            }
        }
    });

    require(['alert','jquery','angular'],function (alert,$,angular) {
        alert.showmsg();
        $("body").css("background","deeppink");
        let app = angular.module('app',[]);
        app.controller("control",function ($scope) {
            $scope.txt = "hello";
        })
    });
})();
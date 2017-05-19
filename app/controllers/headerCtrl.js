(function () {
    'use strict';
    
    var headerCtrl = angular.module("myApp");
    headerCtrl.$inject = ['$scope', 'UsuariosService'];

    headerCtrl.controller("headerCtrl", function($scope, UsuariosService){
        var vm = this;

        UsuariosService.findById('59178793d84eab37f8ec7a81').then(function(data){
            vm.user = data.data;
        });
    })
})();


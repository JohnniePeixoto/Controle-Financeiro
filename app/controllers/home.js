(function () {
    'use strict';
    
    var homeCtrl = angular.module("myApp");
    homeCtrl.$inject = ['$scope', 'UsuariosService'];

    homeCtrl.controller("homeCtrl", function($scope, UsuariosService){
        var vm = this;

        // UsuariosService.findById('59178793d84eab37f8ec7a81').then(function(data){
        //     console.log(data);
        //     vm.user = data.data;
        // });
    })
})();


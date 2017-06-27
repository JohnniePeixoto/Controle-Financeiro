(function () {
    'use strict';
    
    var menuCtrl = angular.module("myApp");
    menuCtrl.$inject = ['$scope', 'UsuariosService', '$state', '$window', 'CommonService', '$cookies'];

    menuCtrl.controller("menuCtrl", function($scope, UsuariosService, $state, $window, CommonService, $cookies){
        var vm = this;
        vm.logout = logout;
        vm.admin = isAdmin;

        var userId = CommonService.getUserId();
        UsuariosService.findById(userId).then(function(data){
            vm.user = data.data;
        });

        function logout() {
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.admin;
            $cookies.remove('userId');
        }

        function isAdmin(){
            return $window.sessionStorage.admin;
        }

    })
})();


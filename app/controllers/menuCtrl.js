(function () {
    'use strict';
    
    var menuCtrl = angular.module("myApp");
    menuCtrl.$inject = ['$scope', 'UsuariosService', '$state', '$window', 'CommonService', '$cookies'];

    menuCtrl.controller("menuCtrl", function($scope, UsuariosService, $state, $window, CommonService, $cookies){
        var vm = this;
        vm.logout = logout;
        vm.isAdmin = isAdmin;

        var userId = CommonService.getUserId();
        UsuariosService.findById(userId).then(function(data){
            vm.user = data.data;
        });

        function logout() {
            delete $window.sessionStorage.token;
            $cookies.remove('userId');
        }

        function isAdmin(){
            return userId === "59178793d84eab37f8ec7a81";
        }

    })
})();


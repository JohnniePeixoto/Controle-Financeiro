(function () {
    'use strict';
    
    var loginCtrl = angular.module("myApp");
    loginCtrl.$inject = ['$scope', 'UsuariosService', '$state', 'AlertService', '$window'];

    loginCtrl.controller("loginCtrl", function($scope, UsuariosService, $state, AlertService, $window){
        var vm = this;
        vm.login = login;

        function login(){
            UsuariosService.login(vm.user).then(function (resposta) {
                    $window.sessionStorage.admin = resposta.data.usuario.admin;
                    $state.go('home');
                }).catch(function (erro) {
                    vm.message = "Usuário ou senha incorretos";
                });
        }
    })
})();

(function () {
    'use strict';
    
    var loginCtrl = angular.module("myApp");
    loginCtrl.$inject = ['$scope', 'UsuariosService', '$state', 'AlertService'];

    loginCtrl.controller("loginCtrl", function($scope, UsuariosService, $state, AlertService){
        var vm = this;
        vm.login = login;

        function login(){
            UsuariosService.login(vm.user).then(function (resposta) {
                    $state.go('home');
                    // AlertService.alert('Seja bem vindo(a).', 'success');
                }).catch(function (erro) {
                    vm.message = "Usuário ou senha incorretos";
                    // AlertService.alert('Usuario ou senha incorretos', 'error');
                });
        }

    })
})();

(function () {
    'use strict';
    
    var registerCtrl = angular.module("myApp");
    registerCtrl.$inject = ['$scope', '$state', '$timeout', 'UsuariosService', 'AlertService'];

    registerCtrl.controller("registerCtrl", function($scope, $state, $timeout, UsuariosService, AlertService){
        var vm = this;
        var _timeout;

        init();

        function init(){
            vm.user = {};
            vm.register = register;
            vm.validatePassword = validatePassword;
            vm.validateLogin = validateLogin;
            vm.loginInvalid = false;
            vm.loginLoad = false;
            vm.loginAvaiable = false;
            vm.passwordInvalid = false;
        }

        function validatePassword(){
            if (vm.user.senha && vm.user.senha2 ){
                if (vm.user.senha != vm.user.senha2){
                    $scope.form.senha2.$invalid = true;
                    vm.passwordInvalid = true;
                } else {
                    vm.passwordInvalid = false;
                    $scope.form.senha2.$invalid = false;
                }
            }
        }
        
        function validateLogin(){
            if ( !_.has(vm.user, 'login')) return;
            if(_timeout) { // if there is already a timeout in process cancel it
                $timeout.cancel(_timeout);
            }
            vm.loginLoad = true;
            _timeout = $timeout(function() {
                UsuariosService.verifyLogin(vm.user.login).then(function(data){
                    vm.loginAvaiable = true;
                }, function(err){
                    $scope.form.login.$invalid = true;
                    vm.loginInvalid = true;
                });
                _timeout = null;
                vm.loginLoad = false;
            }, 800);
        }

        function register(){
            UsuariosService.register(vm.user).then(function (resposta) {
                    $state.go('login');
                    AlertService.alert('Cadastro efetuado com sucesso', 'success');
                }).catch(function (erro) {
                    AlertService.alert('Erro ao cadastrar seu usuário, tente novamente', 'error');
                    console.log(erro);
                });
        }

    })
    .config(function($mdDateLocaleProvider){
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    });
})();

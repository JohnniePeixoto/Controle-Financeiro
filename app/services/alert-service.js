(function () {
    'use strict';
    
    const DELAY = 3000;
    const POSITION = "top right";

    angular
        .module('myApp')
        .service('AlertService', AlertService);

    AlertService.inject = ['ngMaterial'];
    function AlertService($mdToast) {

        var funcoes = {};
        funcoes.alert = _mensagemPersonalizada;
        funcoes.insertSuccess = _insertSuccess;
        funcoes.insertError = _insertError;
        funcoes.updateSuccess = _updateSuccess;
        funcoes.updateError = _updateError;
        funcoes.removeSuccess = _removeSuccess;
        funcoes.removeError = _removeError;

        return funcoes;

        ////////////////

        function _mensagemPersonalizada(msg, tipo) {
            switch (tipo.toLowerCase()) {
                case 'success':
                case 'error':
                case 'warning':
                    return toastr(msg, tipo);
                default:
                    return toastr(msg, 'info');
            }
        }

        function _insertSuccess() {
            var msg = 'Cadastrado com sucesso';
            return toastr(msg, 'success');
        }

        function _updateSuccess() {
            var msg = 'Alterado com sucesso';
            return toastr(msg, 'success');
        }

        function _removeSuccess() {
            var msg = 'Removido com sucesso';
            return toastr(msg, 'success');
        }

        function _insertError(e) {
            var msg = e ? e : 'Erro ao cadastrar registro';
            return toastr(msg, 'error');
        }

        function _updateError(e) {
            var msg = 'Erro ao editar registro';
            console.log(e);
            return toastr(msg, 'error');
        }
        
        function _removeError(e) {
            var msg = 'Erro ao remover o registro';
            var text = e ? e : msg;
            return toastr(text, 'error');
        }
        
        
        function toastr(msg, type) {
            type = type.toLowerCase()+'-toast';
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .theme(type)
                    .position(POSITION)
                    .hideDelay(DELAY)
            );
        };
        
    }
})();
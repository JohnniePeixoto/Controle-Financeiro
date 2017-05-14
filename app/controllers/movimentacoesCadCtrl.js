(function () {
    'use strict';
    
    var movimentacoesCadCtrl = angular.module("myApp");
    movimentacoesCadCtrl.$inject = ['$scope', '$stateParams', 'MovimentacoesService'];

    movimentacoesCadCtrl.controller("movimentacoesCadCtrl", function($scope, $stateParams, MovimentacoesService){
        var vm = this;
        var johnnie = {
                "_id": "59178793d84eab37f8ec7a81",
                "nome": "Johnnie",
                "data_nascimento": "1991-08-11T00:00:00.000Z",
                "saldo": 900,
                "__v": 0
            }     
        
        vm.movimentacao = $stateParams.movimentacao || {tipoFrequencia: 'unica', i_usuarios: johnnie, saldoAtual:'1100' };
        vm.save = save;

        function save(){
            MovimentacoesService.save(vm.movimentacao).then(function (data){
                vm.movimentacao = data.data;
            });
        }
    })
})();


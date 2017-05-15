(function () {
    'use strict';
    
    var movimentacoesListCtrl = angular.module("myApp");
    movimentacoesListCtrl.$inject = ['$scope', 'MovimentacoesService'];

    movimentacoesListCtrl.controller("movimentacoesListCtrl", function($scope, MovimentacoesService){
        var vm = this;

        vm.lista = {};
        
        vm.get = get;
        vm.remove = remove;

        init();

        function init(){
            get();
        }

        function get() {
            var query = vm.busca ? { nome: vm.busca } : {};
            MovimentacoesService.find(query).then(function (data) {
                vm.lista = data.data;
                //ordena();
            });
        }

        function remove(item){
            MovimentacoesService.remove(item._id).then(function (data) {
                vm.categoria = {};
                get();
            });
        }

        function ordena(){
            vm.lista.sort(function(a, b){
                a.data = new Date(a.data);
                b.data = new Date(b.data);
                return a.data < b.data;
            });
        }

    })
})();


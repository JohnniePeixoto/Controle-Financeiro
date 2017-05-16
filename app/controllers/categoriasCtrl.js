(function () {
    'use strict';
    
    var categoriasCtrl = angular.module("myApp");
    categoriasCtrl.$inject = ['$scope', 'CategoriaService'];

    categoriasCtrl.controller("categoriasCtrl", function($scope, CategoriaService){
        var vm = this;
        
        vm.categoria = {};
        vm.lista = {};
        
        vm.get = get;
        vm.save = save;
        vm.edit = edit;
        vm.remove = remove;

        init();

        function init(){
            get();
        }

        function get() {
            var query = vm.busca ? { nome: vm.busca } : {}
            CategoriaService.find(query).then(function (data) {
                vm.lista = _.sortBy(data.data, [cat => cat.descricao.toLowerCase()]);
            });
        }

        function save(){
            CategoriaService.save(vm.categoria).then(function (data) {
                vm.categoria = {};
                get();
            });
        }

        function edit(index){
            var a = new Promise(function(res, rej){get();res();});
            a.then(function(){
                vm.categoria = vm.lista[index];
                vm.lista.splice(index,1);
            });
        }
        
        function remove(item){
            CategoriaService.remove(item._id).then(function (data) {
                vm.categoria = {};
                get();
            });
        }

        var refresh = function(){ get(); };
    })
})();


(function () {
    'use strict';
    
    var UsuariosCtrl = angular.module("myApp");
    UsuariosCtrl.$inject = ['$scope', '$state', '$mdDialog', 'UsuariosService', 'AlertService', 'CommonService'];

    UsuariosCtrl.controller("usuariosCtrl", function($scope, $state, $mdDialog, UsuariosService, AlertService, CommonService){
        var vm = this;
        
        vm.user = {};
        vm.lista = {};
        
        vm.get = get;
        // vm.save = save;
        vm.edit = edit;
        vm.remove = remove;

        init();

        function init(){
            get();
            CommonService.getUserId() != "59178793d84eab37f8ec7a81" ? $state.go('home') : null;
        }

        function get() {
            var query = vm.busca ? { nome: vm.busca } : {}
            UsuariosService.find(query).then(function (data) {
                vm.lista = _.sortBy(data.data, [cat => cat.nome.toLowerCase()]);
            });
        }

        // function save(){
        //     UsuariosService.save(vm.user).then(function (data) {
        //         AlertService.insertSuccess();
        //         vm.user = {};
        //         get();
        //     }, function(err){
        //         AlertService.insertError(err);
        //     });
        // }

        function edit(index){
            var a = new Promise(function(res, rej){get();res();});
            a.then(function(){
                vm.user = vm.lista[index];
                vm.lista.splice(index,1);
            }, function(err){
                AlertService.updateError(err);
            });
        }
        
        function remove(item){
            var confirm = $mdDialog.confirm()
                .title('Excluir Usuário - '+item.nome)
                .textContent('Deseja excluiro o usuário '+item.nome+' e todos os registros vinculados?')
                // .ariaLabel('Lucky day')
                // .targetEvent(ev)
                .cancel('Não')
                .ok('Sim');

            $mdDialog.show(confirm).then(function() {
                UsuariosService.remove(item._id).then(function (data) {
                    AlertService.removeSuccess();
                    vm.user = {};
                    get();
                }, function(err){
                    AlertService.removeError(err);
                });
            }, function(){});
        }

        var refresh = function(){ get(); };
    })
})();


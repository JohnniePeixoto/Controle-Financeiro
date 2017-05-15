(function () {
    'use strict';
    
    var movimentacoesCadCtrl = angular.module("myApp");
    movimentacoesCadCtrl.$inject = ['$scope', '$stateParams', '$location', 'MovimentacoesService'];

    movimentacoesCadCtrl.controller("movimentacoesCadCtrl", function($scope, $stateParams, $location, MovimentacoesService){
        var vm = this;
         
        vm.save = save;
        vm.openCalendar = openCalendar;
        vm.calendarOpened = false;
        vm.movimentacao = {
            tipoFrequencia: 'unica', 
            i_usuarios: "59178793d84eab37f8ec7a81",
            saldoAtual:'1100'
        };
        
        vm.dateFormat = "dd/MM/yyyy"
        vm.dateOptions = {
            format: 'dd/mm/yyyy',
            maxDate: new Date(2100, 1, 1),
            minDate: new Date(2000, 1, 1),
            startingDay: 1,
            showWeeks: false
        };

        if ( $stateParams.id ){
            find($stateParams.id);
            vm.title = "Editando movimentação";
        } else { 
            vm.title = "Cadastrando movimentação";
        }
        
        function openCalendar(){
            vm.calendarOpened = !vm.calendarOpened;
        };

        function save(){
            MovimentacoesService.save(vm.movimentacao).then(function (data){
                vm.movimentacao = data.data;
                $location.path('/movimentacoes');
            });
        }

        function find(id){
            MovimentacoesService.findById(id).then(function(data){
                vm.movimentacao = data.data;
                vm.movimentacao.tipoFrequencia = 'unica'; //TODO remover quando fizer agendamentos
                dateTransform();
            });
        }

        function dateTransform(){
            vm.movimentacao.data = new Date(vm.movimentacao.data);
        }
    })
})();


(function () {
    'use strict';
    
    var movimentacoesCadCtrl = angular.module("myApp");
    movimentacoesCadCtrl.$inject = ['$scope', '$stateParams', '$location', 'MovimentacoesService', 'CommonService'];

    movimentacoesCadCtrl.controller("movimentacoesCadCtrl", function($scope, $stateParams, $location, MovimentacoesService, CommonService){
        var vm = this;
         
        vm.save = save;
        vm.isEditando = isEditando;
        // vm.isOpen = false; //material calendar
        vm.movimentacao = {
            tipoFrequencia: 'unica', //TODO rever quando codificar Agendamentos
            i_usuario: CommonService.getUserId()
        };

        //Calendar stuff
        vm.openCalendar = openCalendar;
        vm.calendarOpened = false;
        vm.dateFormat = "dd/MM/yyyy"
        vm.dateOptions = {
            format: 'dd/mm/yyyy',
            maxDate: new Date(2100, 1, 1),
            minDate: new Date(2000, 1, 1),
            startingDay: 1,
            showWeeks: false
        };
        function openCalendar(){
            vm.calendarOpened = !vm.calendarOpened;
        };//calendar end 

        if ( $stateParams.id ){
            find($stateParams.id);
            vm.title = "Editando movimentação";
        } else { 
            vm.title = "Cadastrando movimentação";
        }
        
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

        function isEditando(){
            return $stateParams.id != null;
        }
    })
})();


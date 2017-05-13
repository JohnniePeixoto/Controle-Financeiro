(function () {
    'use strict';
    
    var movimentacoesListCtrl = angular.module("myApp");
    movimentacoesListCtrl.$inject = ['$scope'];

    movimentacoesListCtrl.controller("movimentacoesListCtrl", function($scope){
        var vm = this;

        vm.title = "Visão Geral";
    })
})();


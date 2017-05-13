(function () {
    'use strict';
    
    var movimentacoesCadCtrl = angular.module("myApp");
    movimentacoesCadCtrl.$inject = ['$scope', '$stateParams'];

    movimentacoesCadCtrl.controller("movimentacoesCadCtrl", function($scope, $stateParams){
        var vm = this;

        vm.tipo = $stateParams.tipo;
    })
})();


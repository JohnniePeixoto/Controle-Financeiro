(function () {
    'use strict';
    
    var homeCtrl = angular.module("myApp");
    homeCtrl.$inject = ['$scope'];

    homeCtrl.controller("homeCtrl", function($scope){
        var vm = this;

        vm.title = "Visão Geral";
    })
})();


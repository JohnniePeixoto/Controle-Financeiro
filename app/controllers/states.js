(function () {
    'use strict';

angular.module("myApp", ['ui.router', 'ui.bootstrap'])
    
    .config(function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: './views/home.html',
                    controller: "homeCtrl as vm"
                })
                .state('movimentacoesList', {
                    url: '/movimentacoes/',
                    templateUrl: './views/movimentacoesList.html',
                    controller: "movimentacoesListCtrl as vm"
                })
                .state('movimentacoesCad', {
                    url: '/movimentacoes/cadastro/:tipo',
                    templateUrl: './views/movimentacoesCad.html',
                    controller: "movimentacoesCadCtrl as vm"
                })
                .state('categorias', {
                    url: '/categorias',
                    templateUrl: './views/categoriasList.html',
                    controller: "categoriasCtrl as vm"
                })
        })

    .controller('mainCtrl', function(){
        console.log("mainCtrl");
    });
})();


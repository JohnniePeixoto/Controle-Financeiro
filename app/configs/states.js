(function () {
    'use strict';

angular.module("myApp", [
        'ngCookies',
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'ngMaterial',
        'ui.router', 
        'ui.bootstrap', 
        'ui.utils.masks',
        'ngMessages',
        'chart.js'
    ])
    .config(function ($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: './views/login.html',
                    controller: "loginCtrl as vm"
                })
                .state('register', {
                    url: '/register',
                    templateUrl: './views/register.html',
                    controller: "registerCtrl as vm"
                })
                .state('home', {
                    url: '/home',
                    templateUrl: './views/home.html',
                    controller: "homeCtrl as vm"
                })
                .state('movimentacoesList', {
                    url: '/movimentacoes',
                    templateUrl: './views/movimentacoesList.html',
                    controller: "movimentacoesListCtrl as vm"
                })
                .state('movimentacoesCad', {
                    url: '/movimentacoes/cadastro/',
                    templateUrl: './views/movimentacoesCad.html',
                    controller: "movimentacoesCadCtrl as vm"
                })
                .state('movimentacoesEdit', {
                    url: '/movimentacoes/:id',
                    templateUrl: './views/movimentacoesCad.html',
                    controller: "movimentacoesCadCtrl as vm"
                })
                .state('categorias', {
                    url: '/categorias',
                    templateUrl: './views/categorias.html',
                    controller: "categoriasCtrl as vm"
                })
                .state('logout', {
                    url: '/login',
                    templateUrl: './views/login.html',
                    controller: "loginCtrl as vm"
                })
                .state('usuarios', {
                    url: '/usuarios',
                    templateUrl: './views/usuarios.html',
                    controller: "usuariosCtrl as vm"
                })
        })

    // .config(['OAuthProvider', function(OAuthProvider) {
    //         OAuthProvider.configure({
    //         baseUrl: 'https://localhost:3000',
    //         clientId: '303805458100-ih29l4mj4rndhaj8lhfc4bpt0171tifv.apps.googleusercontent.com',
    //         clientSecret: 'MCdGXSgQRSGl-JcZhpoUWTt2' // optional
    //     });
    // }])

    // .run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
    //     $rootScope.$on('oauth:error', function(event, rejection) {
    //         // Ignore `invalid_grant` error - should be catched on `LoginController`.
    //         if ('invalid_grant' === rejection.data.error) {
    //             return;
    //         }

    //         // Refresh token when a `invalid_token` error occurs.
    //         if ('invalid_token' === rejection.data.error) {
    //             return OAuth.getRefreshToken();
    //         }

    //         // Redirect to `/login` with the `error_reason`.
    //         return $window.location.href = '/login?error_reason=' + rejection.data.error;
    //     })
    // }]);

})();


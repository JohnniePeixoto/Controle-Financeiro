(function () {
    'use strict';

angular
    .module("myApp")
    .config(['$httpProvider', httpProviderConfig])
    .config(['$mdThemingProvider', mdToastTheme]);

    httpProviderConfig.$inject = ['$httpProvider'];
    function httpProviderConfig($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
        //$httpProvider.interceptors.push('ErrorMessageInterceptor');
    }

    mdToastTheme.$inject = ['ngMaterial'];
    function mdToastTheme($mdThemingProvider) {
        $mdThemingProvider.theme('error-toast');
        $mdThemingProvider.theme('success-toast');
        $mdThemingProvider.theme('warning-toast');
        $mdThemingProvider.theme('info-toast');
    };

//?configs.$inject = ['ui.router', 'ui.bootstrap', 'ui.utils.masks', 'angular-oauth2'];

    // configs.config(['OAuthProvider', function(OAuthProvider) {
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


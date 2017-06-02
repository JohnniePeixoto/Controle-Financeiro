(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('tokenInterceptor', TokenInterceptor);

    TokenInterceptor.inject = ['$q', '$window', '$state','$cookies'];

    function TokenInterceptor($q, $window, $state, $cookies) {
        var interceptor = {
            request: _request,
            response: _response,
            responseError: _responseError
        };

        return interceptor;

        function _request(config) {
            // enviar o token na requisição
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['Authorization'] = $window.sessionStorage.token;
            }
            return config;
        }

        function _response(response) {
            var token = response.headers('Authorization');
            if (token !== null) {
                $window.sessionStorage.token = token;
                $cookies.put('userId', response.headers('userId'));
            }
            return response;
        }

        function _responseError(rejection) {
            if (rejection !== null && rejection.status === 401) {
                delete $window.sessionStorage.token;
                $state.go("login");
            }
            return $q.reject(rejection);
        }
    }
})();
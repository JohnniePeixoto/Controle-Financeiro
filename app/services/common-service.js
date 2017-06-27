(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('CommonService', CommonService);

  CommonService.$inject = ['$cookies', 'UsuariosService', '$window'];
  function CommonService($cookies, UsuariosService, $window) {
    var service = {
      getUser: getUser,
      getUserId: getUserId
    };

    return service;

    function getUser(){
        return UsuariosService.findById(getUserId()).then(function(data){
            return data.data;
        });
    }

    function getUserId(){
        return $cookies.get('userId');
    }

  }
})();
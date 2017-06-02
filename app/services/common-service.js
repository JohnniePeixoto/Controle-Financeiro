(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('CommonService', CommonService);

  CommonService.$inject = ['$cookies', 'UsuariosService'];
  function CommonService($cookies, UsuariosService) {
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
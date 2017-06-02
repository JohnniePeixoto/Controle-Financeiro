(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('UsuariosService', UsuariosService);

  UsuariosService.$inject = ['$http'];
  function UsuariosService($http) {
    var service = {
      find: find,
      findById: findById,
      save: save,
      remove: remove,
      login: login,
      register: save,
      verifyLogin: verifyLogin
    };

    var URL = '/api/usuarios';
    var loginURL = '/api/login';

    return service;

    function find(query) {
        return $http.get(URL, { params: { filter: JSON.stringify(query) } });
    }

    function findById(id) {
        return $http.get(URL + '/' + id);
    }

    function save(record) {
        console.log(JSON.stringify(record));
        if (record._id) {
            return $http.put(URL + '/' + record._id, record);
        } else {
            return $http.post(URL, record);
        }
    }

    function remove(id) {
      return $http.delete(URL + '/' + id);
    }

    function login(query){
      return $http.post(loginURL, JSON.stringify(query));
    }

    function verifyLogin(query){
      return $http.post('api/verify', JSON.stringify(query));
    }

  }
})();
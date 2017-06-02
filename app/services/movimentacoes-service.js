(function () {
  'use strict';

  angular
    .module('myApp')
    .factory('MovimentacoesService', MovimentacoesService);

  MovimentacoesService.$inject = ['$http', 'CommonService'];
  function MovimentacoesService($http, CommonService) {
    var service = {
      find: find,
      findById: findById,
      save: save,
      remove: remove
    };

    var URL = '/api/movimentacoes';

    return service;

    function find(query) {
        query.i_usuario = CommonService.getUserId();
        return $http.get(URL, { params: { filter: JSON.stringify(query) }});
    }
    
//     function findByMonth(month){
//       var start = new Date(2010, 11, 1);
//       var end = new Date(2010, 11, 30);

//       db.posts.find({created_on: {$gte: start, $lt: end}}); 
//       return $http.get(URL, { params: { filter: JSON.stringify(query) } });
//     }

    function findById(id) {
        return $http.get(URL + '/' + id);
    }

    function save(record) {
        if (record._id) {
            return $http.put(URL + '/' + record._id, record);
        } else {
            return $http.post(URL, record);
        }
    }

    function remove(id) {
      return $http.delete(URL + '/' + id);
    }
  }
})();

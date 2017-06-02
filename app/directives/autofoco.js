(function () {
    'use strict';

    angular.module('myApp')
        .directive('autoFoco', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link : function($scope, $element) {
                $scope.$watch('autoFoco', function(focus){
                    $timeout(function() {
                        $element[0].focus();
                    });
                });
            }
        }
    }]);

})();
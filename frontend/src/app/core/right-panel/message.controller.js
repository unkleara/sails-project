(function() {
    'use strict';

    angular.module('core').controller('MessageCtrl', ['$scope', 'auth', 'Socket', 'activities',
        function($scope, auth, Socket, activities) {

            $scope.message = {};


            $scope.createMessage = function() {
                Socket.request({
                    method: 'post',
                    url: '/message',
                    params: $scope.message
                }, function (data, jwr) {
                    $scope.message = {};
                    console.log('online');
                });
            };


        }]);

}());

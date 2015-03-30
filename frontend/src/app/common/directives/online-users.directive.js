//(function() {
//    'use strict';
//
//    angular.module('common')
//        .directive('onlineUserList', [
//            'config', '$timeout', 'Socket', 'Online',
//            function(config, $timeout, Socket, Online) {
//                return {
//                    restrict: 'EA',
//                    templateUrl: '/common.list.view.html',
//                    controller: function() {
//                        var vm = this;
//
//                        var fakeData = [
//                            {"_id":"545ab71635fe5a08006d5814","username":"Gromph","email":"wrath625@gmail.com"},
//                            {"_id":"54bda4c8b489a1e61072e67b","username":"Dashra","email":"caeadorn@yahoo.com"},
//                            {"_id":"54814ee674b2689c93dd0b540","username":"Liminsathil","email":"lim@example.com"},
//                            {"_id":"54751aa5ec6c5539da5c2354","username":"Akrylis","email":"unkleara@gmail.com"},
//                            {"_id":"546aaa41d2abfe9aab10eb0c","username":"Shadow","email":"shadow@example.com"},
//                            {"_id":"545ab585aea9100800421908","username":"Unkle","email":"unkleara@gmail.com"}
//                        ];
//
//                        vm.users = { data: [] };
//                        Socket.on('onlineStatus', function(message) {
//                            console.log(message);
//                            //$scope.messages.unshift(message);
//                        });
//                        //Online.getData.then(function(data) {
//                        var count = 0;
//                        angular.forEach(fakeData, function(user) {
//                            count++;
//                            $timeout(function() {
//                                vm.users.data.push(user);
//                            }, 350 * count);
//                        });
//                        //});
//                    },
//                    controllerAs: 'vm',
//                    bindToController: true
//                };
//            }])
//        .directive('onlineUser', [
//            'config', 'deviceDetector', function(config, deviceDetector) {
//                return {
//                    restrict: 'EA',
//                    templateUrl: '/common.online.view.html',
//                    scope: {
//                        user: '=',
//                        isCollapsed: '='
//                    },
//                    controller: function() {
//                        this.deviceDetector = deviceDetector;
//                        this.iconPath = config.iconPath;
//                        this.isCollapsed = true;
//                    },
//                    controllerAs: 'vm',
//                    bindToController: true
//                };
//            }]);
//}());
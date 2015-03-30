(function() {
    'use strict';

    angular.module('core')
        .directive('onlineUserList', [
            '$document', '$timeout', 'Socket', 'auth', 'rx',
            function($document, $timeout, Socket, auth, rx) {
                return {
                    restrict: 'EA',
                    templateUrl: '/online-users-list.view.html',
                    controller: function($scope) {
                        var vm = this;
                        vm.users = { data: [] };
                        var count = 0;

                        // Rx subscribe to mousemove events as 2.5s interval
                        // Check to see if current user is logged in to mark them online

                        // TODO: add unsubsribe when user is online and subscribe when is active again
                        var mousemove = rx.Observable.fromEvent($document, 'mousemove');


                        var mousemoveSubscription = mousemove.throttle(2500)
                            .filter(function(event) {
                                if (auth.isAuthenticated() && (event.clientY >= 100))

                                //console.log('client: ' + event.clientY);
                                //console.log('page: ' + event.pageY);
                                //console.log('offset: ' + event.offsetY);
                                    return event;
                            }).throttle(500).forEach(function () {
                                setUserOnline();
                            });

                        var REFRESH_ONLINE_STATUS_INTERVAL = 250;
                        var onlineUsersSubscription = rx.Observable.interval(1000)
                            .safeApply($scope, function() {
                                angular.forEach(vm.users.data, function (user) {

                                    user.msUntilInactive -= REFRESH_ONLINE_STATUS_INTERVAL;
                                    user.signedIn = user.msUntilInactive > 0;
                                });
                            });

                        io.socket.on('connect', function() {
                            console.log('connected');
                            //add mousemove subscribe as well
                            //mousemoveSubscription.subscribe();

                            onlineUsersSubscription.subscribe();
                        });

                        io.socket.on('disconnect', function() {
                            console.log('disconnect');
                            mousemoveSubscription.dispose();
                            onlineUsersSubscription.dispose();
                        });

                        Socket.get('/user/online', function(data, jwr) {
                            angular.forEach(data, function(user) {
                                count++;
                                $timeout(function() {
                                    vm.users.data.push(user);
                                }, 350 * count);
                            });
                        });

                        Socket.on('user', function(event) {
                            if (event.verb === 'updated') {
                                angular.forEach(vm.users.data, function (user) {
                                    if (user.id === event.id) {
                                        angular.extend(user, event.data);
                                    }
                                });
                            }
                        });


                        function setUserOnline() {
                            Socket.request({
                                method: 'put',
                                url: '/user/online'
                            }, function (data, jwr) {
                                console.log('now online');
                            });
                        }
                    },
                    controllerAs: 'vm',
                    bindToController: true
                };
            }])

}());

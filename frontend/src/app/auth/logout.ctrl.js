(function() {
    'use strict';

    angular.module('auth')
        .controller('LogoutCtrl', ['$state', 'auth', function($state, auth) {
            if (!auth.isAuthenticated()) {
                return;
            }
            auth.setUserOffline()
                .then(function(response) {
                    if (response.status === 200)
                    return auth.logout(function() {
                        $state.go('home');
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
            //auth.logout()
            //    .then(function(response) {
            //        $state.go('home');
            //    })
            //    .catch(function(error) {
            //        console.log(error);
            //    });

        }]);

}());
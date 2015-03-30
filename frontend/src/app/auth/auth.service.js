(function() {
    'use strict';

    angular.module('auth').factory('auth', [
        'config', '$auth', '$http',
        function(config, $auth, $http) {
            var service = {
                currentUser: null,
                setUserOffline: setUserOffline
            };

            var payload = null;

            if ($auth.isAuthenticated()) {
                payload = $auth.getPayload();
                getCurrentUser();
            }


            function getCurrentUser() {
                return $http.get(config.API_URL + '/auth/currentUser/' + payload.sub)
                    .then(function(response) {
                        console.log(response.data);
                        service.currentUser = response.data;
                    });

            }

            function setUserOffline() {
                return $http.put(config.API_URL + '/user/offline', {})
                    .then(function(response) {
                        console.log(response);
                        return response;
                    });
            }


            angular.extend(service, $auth);
            return service;
        }]);
}());
(function() {
    'use strict';

    // Sails Socket.io wrapper service
    //TODO: Lots of code duplication but easier to read and spend time later refactoring
    //TODO: OR find a lib that allows configurable headers and is mature
    angular.module('core').service('Socket', ['$timeout', 'auth',
        function($timeout, auth) {

            this.socket = io.socket;

            //Defaults for request config
            var options = {
                method: 'get',
                url: null,
                params: {},
                headers: {authorization: 'Bearer ' + auth.getToken()}
            };

            // Wrap the sails.io 'request' method (allows configurable options, ie. send auth token in header)
            this.request = function(reqConfig, callback) {
                if (this.socket) {
                    setHeaders(reqConfig);
                    this.socket.request(options, function(data, jwr) {
                        $timeout(function() {
                            callback(data);
                        });
                    });
                }
            };

            this.get = function(eventName, callback) {
                if (this.socket) {
                    this.socket.get(eventName, function(data, jwr) {
                        $timeout(function() {
                            callback(data);
                        });
                    });
                }
            };

            this.post = function(eventName, callback) {
                if (this.socket) {
                    this.socket.post(eventName, data, function(data, jwr) {
                        $timeout(function() {
                            callback(data);
                        });
                    });
                }
            };

            this.delete = function(eventName, callback) {
                if (this.socket) {
                    this.socket.delete(eventName, data, function(data, jwr) {
                        $timeout(function() {
                            callback(data);
                        });
                    });
                }
            };

            this.on = function(eventName, callback) {
                if (this.socket) {
                    this.socket.on(eventName, function(data, jwr) {
                        $timeout(function() {
                            callback(data);
                        });
                    });
                }
            };


            function setHeaders(opts) {
                options.method = opts.method;
                options.url = opts.url;
                options.params = opts.params || {};
                options.headers.authorization = 'Bearer ' + auth.getToken();
            }

        }
    ]);

}());

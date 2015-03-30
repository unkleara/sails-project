(function() {
    'use strict';

    angular.module('auth')
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$authProvider',
            function ($locationProvider, $stateProvider, $urlRouterProvider, $authProvider) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl :  '/login.view.html',
                        controller: 'LoginCtrl as vm'
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: '/signup.view.html',
                        controller: 'SignupCtrl as vm'
                    })
                    .state('logout', {
                        url: '/logout',
                        template: null,
                        controller: 'LogoutCtrl'
                    });

                //$authProvider.httpInterceptor = true;
                //$authProvider.authHeader = 'Authorization';
                $authProvider.withCredentials = true;
                $authProvider.loginRedirect = '/';
                $authProvider.logoutRedirect = '/';
                $authProvider.signupRedirect = '/login';
                $authProvider.loginUrl = 'http://localhost:1337/auth/login';
                $authProvider.signupUrl = 'http://localhost:1337/auth/signup';
                $authProvider.loginRoute = '/login';
                $authProvider.signupRoute = '/signup';

            }]);
}());
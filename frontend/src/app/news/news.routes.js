(function() {
  'use strict';

  angular.module('news')
  .config(['$stateProvider',
      function ($stateProvider) {
          $stateProvider
              .state('news', {
                  url: '/news',
                  templateUrl : '/news.view.html',
                  abstract: true

              })
              .state('news.list', {
                  url: '',
                  templateUrl : '/news.list.view.html',
                  controller: 'NewsCtrl as vm'
              })
              .state('news.create', {
                url: '/create',
                templateUrl: '/news.create.view.html',
                controller: 'NewsCtrl as vm'
              });



      }]);

}());

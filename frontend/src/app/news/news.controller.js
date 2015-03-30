(function() {
    'use strict';

    angular.module('news').controller('NewsCtrl', [
      '$scope', '$resource',
    function($scope, $resource) {
      var vm = this;
      vm.newPost = {};


      var news = $resource('http://localhost:1337/news');

      vm.news = news.query();



      vm.create = function() {
        news.save(vm.newPost, function(post) {
          console.log(post);
        }, function(error) {
          console.log(error);
        });
      };

    }]);

}());

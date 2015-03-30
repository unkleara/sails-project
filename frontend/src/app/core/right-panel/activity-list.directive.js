(function() {
    'use strict';

    angular.module('core')
        .directive('activityList', [ function() {
            return {
                restrict: 'EA',
                templateUrl: '/right-panel.view.html',
                controller: ['$scope', 'activities', function($scope, activities) {
                  console.log(activities);
                    $scope.activities = activities;

                }]
            };
        }]);
}());

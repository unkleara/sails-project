(function() {
    'use strict';

    angular.module('core').controller('AppCtrl', ['$scope', '$auth', function($scope, $auth) {

        $scope.isAuthenticated = isAuthenticated;
        $scope.toggleLeftPanel = toggleLeftPanel;
        $scope.toggleRightPanel = toggleRightPanel;
        $scope.leftVisible = true;
        $scope.rightVisible = true;

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function toggleLeftPanel(e) {
            $scope.leftVisible = !$scope.leftVisible;
            e.stopPropagation();
        }

        function toggleRightPanel(e) {
            $scope.rightVisible = !$scope.rightVisible;
            e.stopPropagation();
        }

    }]);

}());

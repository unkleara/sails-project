/* Usage:
* <input type='text' autofocus>
*/

(function () {
    'use strict';

    angular.module('core')
        .directive('autofocus', ['$timeout',
            function ($timeout) {
                return {
                    restrict: 'A',
                    link: function ($scope, $element) {
                        $timeout(function () {
                            $element[0].focus();
                        });
                    }
                };
            }
        ])
        .directive('inputFocus', [function() {
            var FOCUS_CLASS = 'ng-focused';
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$focused = false;
                    element.bind('focus', function(evt) {
                        element.addClass(FOCUS_CLASS);
                        scope.$apply(function() {ctrl.$focused = true;});
                    }).bind('blur', function(evt) {
                        element.removeClass(FOCUS_CLASS);
                        scope.$apply(function() {ctrl.$focused = false;});
                    });
                }
            };
        }]);
}());

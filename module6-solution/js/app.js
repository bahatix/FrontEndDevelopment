// app.js

// Declare the AngularJS module and match it to ng-app declaration
var app = angular.module('LunchCheck', []);

// Create a controller within the module
app.controller('MessageController', function($scope) {
    $scope.outputMessage = '';

    $scope.displayMessage = function() {
        $scope.outputMessage = $scope.message;
    };
});

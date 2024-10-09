// app.js

// Declare the AngularJS module
var app = angular.module('LunchCheck', []);

// Define the controller and inject $scope using the $inject property to prevent minification issues
app.controller('LunchCheckController', ['$scope', function($scope) {
    $scope.outputMessage = '';  // Initial empty message

    // Function that updates outputMessage with the content of the input box
    $scope.displayMessage = function() {
        if (!$scope.message) {
            $scope.outputMessage = "Please enter a message!";
        } else {
            $scope.outputMessage = $scope.message;
        }
    };
}]);

// Alternatively, define the controller using the $inject property explicitly
app.controller('LunchCheckController').$inject = ['$scope'];

// app.js

(function() {
    'use strict';

    // Define the AngularJS module
    angular.module('LunchCheck', [])
    
    // Define the controller and inject $scope using the $inject property to prevent minification issues
    .controller('LunchCheckController', LunchCheckController);

    // Explicitly inject $scope to protect the code from minification
    LunchCheckController.$inject = ['$scope'];

    // Define the controller function
    function LunchCheckController($scope) {
        // Initial values
        $scope.outputMessage = '';
        $scope.messageClass = '';   // Used to set font color
        $scope.borderClass = '';    // Used to set border color

        // Function to display the appropriate message based on the number of items
        $scope.displayMessage = function() {
            if (!$scope.message || $scope.message.trim() === "") {
                // Handle empty input
                $scope.outputMessage = "Please enter data first";
                $scope.messageClass = 'red-text';  // Set font color to red
                $scope.borderClass = 'red-border'; // Set border color to red
            } else {
                // Split the items by commas, remove empty items
                var items = $scope.message.split(',').filter(function(item) {
                    return item.trim() !== '';
                });

                // Determine the message based on the number of items
                if (items.length === 0) {
                    $scope.outputMessage = "Please enter data first";
                    $scope.messageClass = 'red-text';  // Set font color to red
                    $scope.borderClass = 'red-border'; // Set border color to red
                } else if (items.length <= 3) {
                    $scope.outputMessage = "Enjoy!";
                    $scope.messageClass = 'green-text'; // Set font color to green
                    $scope.borderClass = 'green-border'; // Set border color to green
                } else {
                    $scope.outputMessage = "Too much!";
                    $scope.messageClass = 'green-text'; // Set font color to green
                    $scope.borderClass = 'green-border'; // Set border color to green
                }
            }
        };
    }
})();

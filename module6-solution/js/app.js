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
        // Initial message value
        $scope.outputMessage = '';

        // Function to display the appropriate message based on the number of items
        $scope.displayMessage = function() {
            if (!$scope.message || $scope.message.trim() === "") {
                $scope.outputMessage = "Please enter data first";
            } else {
                // Split the items by commas and remove empty items (if necessary)
                var items = $scope.message.split(',').filter(function(item) {
                    return item.trim() !== '';
                });

                // Determine the message based on the number of items
                if (items.length === 0) {
                    $scope.outputMessage = "Please enter data first"; // No valid items
                } else if (items.length <= 3) {
                    $scope.outputMessage = "Enjoy!";
                } else {
                    $scope.outputMessage = "Too much!";
                }
            }
        };
    }
})();


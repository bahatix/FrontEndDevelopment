(function () {
  'use strict';

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$http', 'UserService'];
  function SignUpController($http, UserService) {
    var signupCtrl = this;

    // Model for form data
    signupCtrl.user = {};
    signupCtrl.favoriteError = null;
    signupCtrl.successMessage = null;

    /**
     * Validate favorite menu item.
     * This method checks if the favorite item exists by querying the API.
     */
    signupCtrl.validateFavorite = function () {
      var favoriteItem = signupCtrl.user.favoriteItem;
      if (!favoriteItem) return;

      var category = favoriteItem.charAt(0); // Assume category is the first letter
      var itemIndex = parseInt(favoriteItem.slice(1)) - 1; // Extract index

      var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${category}/menu_items/${itemIndex}.json`;

      // API call to check if the item exists
      $http.get(url).then(function (response) {
        if (!response.data) {
          signupCtrl.favoriteError = 'No such menu number exists.';
        } else {
          signupCtrl.favoriteError = null; // No error
        }
      }, function () {
        signupCtrl.favoriteError = 'Error validating favorite item.';
      });
    };

    /**
     * Submit form data.
     * This method saves user data if the form is valid and favorite item exists.
     */
    signupCtrl.submit = function () {
      if (signupCtrl.favoriteError) {
        signupCtrl.successMessage = null;
        return;
      }

      // Save user data via UserService
      UserService.saveUser(signupCtrl.user);

      // Show success message
      signupCtrl.successMessage = 'Your information has been saved.';
    };
  }
})();

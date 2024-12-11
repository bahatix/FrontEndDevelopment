(function () {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['$http', 'UserService'];
  function MyInfoController($http, UserService) {
    var myinfoCtrl = this;

    // Get the user data from UserService
    myinfoCtrl.user = UserService.getUser();
    myinfoCtrl.favoriteItem = null;
    myinfoCtrl.message = null;

    if (myinfoCtrl.user) {
      // If user data exists, fetch the favorite item details
      var favoriteItem = myinfoCtrl.user.favoriteItem;
      var category = favoriteItem.charAt(0); // Assume category is the first letter
      var itemIndex = parseInt(favoriteItem.slice(1)) - 1; // Extract index

      var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${category}/menu_items/${itemIndex}.json`;

      // Fetch favorite item details from the API
      $http.get(url).then(function (response) {
        if (response.data) {
          myinfoCtrl.favoriteItem = response.data; // Save favorite item details
        } else {
          myinfoCtrl.message = 'Favorite menu item details not found.';
        }
      }, function () {
        myinfoCtrl.message = 'Error fetching favorite menu item details.';
      });
    } else {
      // If no user data, set a "Not Signed Up" message
      myinfoCtrl.message = 'Not Signed Up Yet. Sign up Now!';
    }
  }
})();

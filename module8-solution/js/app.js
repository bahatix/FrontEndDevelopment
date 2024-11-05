// app.js
(function () {
  'use strict';

  // Declare the AngularJS module
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  // Controller Definition
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = "";
    ctrl.found = [];
    ctrl.noItemsFound = false;

    // Function to handle "Narrow It Down For Me!" button click
    ctrl.narrowItDown = function () {
      if (ctrl.searchTerm.trim() === "") {
        ctrl.found = [];
        ctrl.noItemsFound = true;
        return;
      }

      // Fetch matched menu items
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (foundItems) {
        ctrl.found = foundItems;
        ctrl.noItemsFound = foundItems.length === 0;
      });
    };

    // Function to remove an item from the found list
    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
    };
  }

  // Service Definition
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    // Method to fetch and filter menu items
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
      }).then(function (result) {
        var foundItems = [];
        var items = result.data;

        // Filter items by search term
        angular.forEach(items, function (item) {
          if (item.description && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push({
              name: item.name,
              short_name: item.short_name,
              description: item.description
            });
          }
        });

        return foundItems;
      });
    };
  }

  // Directive Definition
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html', // Points to embedded template in index.html
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'dirCtrl',
      bindToController: true
    };

    return ddo;
  }

  // Directive Controller (optional, for any directive-specific logic)
  function FoundItemsDirectiveController() {
    var dirCtrl = this;
  }

})();


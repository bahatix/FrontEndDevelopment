// app.js
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;
  narrowCtrl.searchTerm = "";
  narrowCtrl.found = [];

  narrowCtrl.narrowItDown = function () {
    if (narrowCtrl.searchTerm) {
      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
        .then(function (foundItems) {
          narrowCtrl.found = foundItems;
        });
    } else {
      narrowCtrl.found = [];
    }
  };

  narrowCtrl.removeItem = function (index) {
    narrowCtrl.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (response) {
      var allItems = response.data;
      var foundItems = [];

      // Loop through all categories and filter items by description match
      angular.forEach(allItems, function (category) {
        angular.forEach(category.menu_items, function (item) {
          if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundItems.push(item);
          }
        });
      });

      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  return {
    template: `
      <ul>
        <li ng-repeat="item in items">
          {{ item.name }} ({{ item.short_name }}), {{ item.description }}
          <button class="btn btn-danger btn-sm" ng-click="onRemove({ index: $index })">Don’t want this one!</button>
        </li>
      </ul>
    `,
    scope: {
      items: '<',
      onRemove: '&'
    }
  };
}

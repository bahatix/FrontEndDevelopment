(function () {
  'use strict';

  // Declare the AngularJS module
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('customCurrency', CustomCurrencyFilter);

  // Controller for "To Buy" list
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    // Get reference to the "to buy" items from the service
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    // Function to mark an item as bought
    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  // Controller for "Already Bought" list
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'customCurrencyFilter'];
  function AlreadyBoughtController(ShoppingListCheckOffService, customCurrencyFilter) {
    var bought = this;

    // Get reference to the "bought" items from the service
    bought.items = ShoppingListCheckOffService.getBoughtItems();

    // Calculate total price using the custom filter (on the fly)
    bought.getTotalPrice = function (item) {
      return customCurrencyFilter(item.quantity * item.pricePerItem);
    };
  }

  // Service that handles the shopping list logic
  function ShoppingListCheckOffService() {
    var service = this;

    // Initial list of items to buy (now with pricePerItem)
    var toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 2.0 },
      { name: "chips", quantity: 5, pricePerItem: 1.5 },
      { name: "sodas", quantity: 8, pricePerItem: 1.25 },
      { name: "apples", quantity: 6, pricePerItem: 0.75 },
      { name: "bananas", quantity: 12, pricePerItem: 0.5 }
    ];

    // List for bought items
    var boughtItems = [];

    // Function to move an item from the "To Buy" list to the "Bought" list
    service.buyItem = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);  // Move item to "bought" list
      toBuyItems.splice(itemIndex, 1);  // Remove item from "to buy" list
    };

    // Function to get the "To Buy" list
    service.getToBuyItems = function () {
      return toBuyItems;
    };

    // Function to get the "Bought" list
    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

  // Custom currency filter for Angular Dollars (e.g., $$$20.00)
  function CustomCurrencyFilter() {
    return function (input) {
      return "$$$" + parseFloat(input).toFixed(2);
    };
  }

})();

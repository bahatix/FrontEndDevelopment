(function () {
  'use strict';

  angular.module('common') // Register the service under 'common'
    .service('UserService', UserService);

  function UserService() {
    var service = this;
    var user = null;

    service.saveUser = function (userData) {
      user = userData;
    };

    service.getUser = function () {
      return user;
    };
  }
})();

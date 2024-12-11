describe('MyInfoController', function () {
  var $controller, $httpBackend, MyInfoController, UserService;

  beforeEach(module('public')); // Load the public module

  beforeEach(inject(function (_$controller_, _$httpBackend_, _UserService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    UserService = _UserService_;

    // Initialize the controller
    MyInfoController = $controller('MyInfoController', { UserService: UserService });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch user details and favorite menu item', function () {
    // Arrange
    var user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      favoriteItem: 'L1'
    };
    UserService.saveUser(user);

    $httpBackend.expectGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/0.json')
      .respond(200, { name: 'Chicken Curry', description: 'Delicious chicken curry.' });

    // Act
    MyInfoController = $controller('MyInfoController', { UserService: UserService });
    $httpBackend.flush();

    // Assert
    expect(MyInfoController.user).toEqual(user);
    expect(MyInfoController.favoriteItem.name).toEqual('Chicken Curry');
    expect(MyInfoController.favoriteItem.description).toEqual('Delicious chicken curry.');
  });

  it('should handle missing favorite menu item gracefully', function () {
    // Arrange
    var user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      favoriteItem: 'L999'
    };
    UserService.saveUser(user);

    $httpBackend.expectGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/998.json')
      .respond(200, null);

    // Act
    MyInfoController = $controller('MyInfoController', { UserService: UserService });
    $httpBackend.flush();

    // Assert
    expect(MyInfoController.user).toEqual(user);
    expect(MyInfoController.favoriteItem).toBeNull();
  });

  it('should show an error if user is not registered', function () {
    // Act
    MyInfoController = $controller('MyInfoController', { UserService: UserService });

    // Assert
    expect(MyInfoController.user).toBeNull();
    expect(MyInfoController.message).toEqual('Not Signed Up Yet. Sign up Now!');
  });
});

describe('SignUpController', function () {
  var $controller, $httpBackend, SignUpController, UserService;

  beforeEach(module('public')); // Load the public module

  beforeEach(inject(function (_$controller_, _$httpBackend_, _UserService_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    UserService = _UserService_;

    // Initialize the controller
    SignUpController = $controller('SignUpController', { UserService: UserService });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should validate a valid favorite menu item', function () {
    // Arrange
    $httpBackend.expectGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/0.json')
      .respond(200, { name: 'Chicken Curry' });

    SignUpController.user.favoriteItem = 'L1';

    // Act
    SignUpController.validateFavorite();
    $httpBackend.flush();

    // Assert
    expect(SignUpController.favoriteError).toBeNull();
  });

  it('should display an error for an invalid favorite menu item', function () {
    // Arrange
    $httpBackend.expectGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/999.json')
      .respond(200, null);

    SignUpController.user.favoriteItem = 'L999';

    // Act
    SignUpController.validateFavorite();
    $httpBackend.flush();

    // Assert
    expect(SignUpController.favoriteError).toEqual('No such menu number exists.');
  });

  it('should save user information on valid submission', function () {
    // Arrange
    spyOn(UserService, 'saveUser');
    $httpBackend.expectGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/0.json')
      .respond(200, { name: 'Chicken Curry' });

    SignUpController.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      favoriteItem: 'L1'
    };

    // Act
    SignUpController.validateFavorite();
    $httpBackend.flush();
    SignUpController.submit();

    // Assert
    expect(UserService.saveUser).toHaveBeenCalledWith(SignUpController.user);
    expect(SignUpController.successMessage).toEqual('Your information has been saved.');
  });
});

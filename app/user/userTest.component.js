/**
 * @class jwa-user.userTest
 * @memberOf jwa-user
 * @desc For test user authentication and authorization
 */
class userTestController {
  constructor($scope,userService) {
    this.$scope = $scope;
    this.service = userService;
  }
}

userTestController.$inject = ["$scope","userService"];

export const userTest = {
  bindings: {},
  controller: userTestController,
  template: require('./userTest.component.html')
};

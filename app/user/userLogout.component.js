/**
 * @class jwa-user.userLogout
 * @memberOf jwa-user
 * @desc All this does is logout the current user
 */
class userLogoutController {
  constructor($scope,$state,userService) {
    this.$scope = $scope;
    this.$state = $state;
    this.userService = userService;
  }

  $onInit() {
    console.log("Loggin out user");
    this.userService.logout();
  }
}

userLogoutController.$inject = ["$scope","$state","userService"];

export const userLogout = {
  bindings: {},
  controller: userLogoutController,
  template: "Logging out!"
};

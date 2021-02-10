/**
 * @class jwa-user.userLogin
 * @memberOf jwa-user
 * @desc Allows the user to login, displays nothing if the user is logged in
 */
class userLoginController {
  constructor($scope,userService) {
    this.$scope = $scope;
    this.service = userService;
  }

  $onInit() {
    this.username = "";
    this.password = "";
    this.authenticating = false;
    this.errorMessage = false;
  }

  doUserLogin() {
    this.authenticating = true;
    console.log("Do the user login thing!");

    const returnToOriginalState = () => {
      console.log("User is authenticated.  Returning to original state!");
    };

    const showError = (error) => {
      this.errorMessage = error.data.message;
    };

    this.service.authenticateUser(this.username,this.password)
      .then(returnToOriginalState)
      .catch(showError)
      .finally(() => {
        this.authenticating = false;
      });
  }
}

userLoginController.$inject = ["$scope","userService"];

export const userLogin = {
  bindings: {
    returnTo: "<"
  },
  controller: userLoginController,
  template: require('./userLogin.component.html')
};

/**
 * @class jwa-user.userLogin
 * @memberOf jwa-user
 * @desc Allows the user to login, displays nothing if the user is logged in
 */
class userLoginController {
  constructor($scope,userService,$state) {
    this.$scope = $scope;
    this.service = userService;
    this.$state = $state;
    this.alerts = [];
  }

  $onInit() {
    this.username = "";
    this.password = "";
    this.authenticating = false;
    this.errorMessage = false;
    this.alerts = [];
  }

  doUserLogin() {
    this.authenticating = true;

    const returnToOriginalState = () => {
      let state = this.returnTo.state();
      let params = this.returnTo.params();
      let options = Object.assign({},this.returnTo.options(),{ reload:true });
      this.$state.go(state,params,options);
    };

    const showError = (error) => {
      let message = error.data.message;
      this.alerts.push({
        type: "danger",
        message: message
      });
      console.error(message);
    };

    this.service.authenticateUser(this.username,this.password)
      .then(returnToOriginalState)
      .catch(showError)
      .finally(() => {
        this.authenticating = false;
      });
  }

  closeAlert(index) {
    // Remove the alert from the array
    this.alerts.splice(index,1);
  }
}

userLoginController.$inject = ["$scope","userService","$state"];

export const userLogin = {
  bindings: {
    returnTo: "<"
  },
  controller: userLoginController,
  template: require('./userLogin.component.html')
};

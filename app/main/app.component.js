/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions,userService,appState,$interval,adminService,$uibModal) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
    this.userService = userService;
    this.appState = appState;
    this.$interval = $interval;
    this.adminService = adminService;
    this.$uibModal = $uibModal;

    this.date = new Date();
    $interval(() => {
      this.date = new Date();
    },1000);

    this.greeting = "Justice Web App v" + APP_VERSION;
  }

  $onInit() {
    this.userState = this.appState.getUserState();
  }

  logout() {
    this.userService.logout();
  }

  resetPassword() {
    console.log("Resetting password");
    let instance = this.$uibModal.open({
      animate: false,
      component: "passwordReset",
      keyboard: true,
      resolve: {
        userId: userIdResolver
      }
    });
  }
};

appController.$inject = ['$scope','$resource','$state','$transitions',"userService","jwa-app-state-service","$interval","adminService","$uibModal"];

export const app = {
  controller: appController,
  template: require('./app.component.html')
}

////////////////////////////////////////////////////////////////////////////////
// Component Resolvers
////////////////////////////////////////////////////////////////////////////////
userIdResolver.$inject = ["jwa-app-state-service"];
function userIdResolver(stateService) {
  return stateService.getUserState().userId;
}

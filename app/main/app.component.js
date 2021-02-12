/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions,userService,appState,$interval) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
    this.userService = userService;
    this.appState = appState;
    this.$interval = $interval;

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
};

appController.$inject = ['$scope','$resource','$state','$transitions',"userService","jwa-app-state-service","$interval"];

export const app = {
  controller: appController,
  template: require('./app.component.html')
}

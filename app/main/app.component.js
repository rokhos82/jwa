/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions,userService) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
    this.userService = userService;

    this.greeting = "Justice Web App v" + APP_VERSION;
  }
};

appController.$inject = ['$scope','$resource','$state','$transitions',"userService"];

export const app = {
  controller: appController,
  template: require('./app.component.html')
}

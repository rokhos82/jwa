/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;

    this.greeting = "Justice Web App" + " v0.2.1";
  }
};

appController.$inject = ['$scope','$resource','$state','$transitions'];

export const app = {
  controller: appController,
  template: require('./app.component.html')
}

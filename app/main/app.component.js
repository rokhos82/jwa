/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;

    this.greeting = "Justice Web App" + " v0.1.0";
  }
};

appController.$inject = ['$scope','$resource','$state','$transitions'];

export const app = {
  controller: appController,
  template: `
  <container>
    <h1>{{$ctrl.greeting}}</h1>
    <button ui-sref="welcome">Home</button>
    <button ui-sref="name">Names</button>
    <ui-view></ui-view>
  </container>`
}

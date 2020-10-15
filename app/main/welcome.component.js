class welcomeController {
  constructor($scope,$state,$transitions) {
    this.$scope = $scope;
    this.$state = $state;
    this.$transitions = $transitions;
  }
}

welcomeController.$inject = ['$scope','$state','$transitions'];

export const welcome = {
  controller: welcomeController,
  template: `<p>Welcome to the Justice Web App.  This program is currently under development and will be buggy.</p>`
};

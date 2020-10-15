class nameSearchController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
  }
}

nameSearchController.$inject = ['$scope','$resource','$state','$transitions'];

export const nameSearch = {
  controller: nameSearchController,
  template: ``
};

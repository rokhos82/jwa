class nameDetailController {
  construction($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
  }
}

nameDetailController.$inject = ['$scope','$resource','$state','$transitions'];

export const nameDetail = {
  controller: nameDetailController,
  template: ``
};

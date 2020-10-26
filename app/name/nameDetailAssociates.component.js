class associatesController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

associatesController.$inject = ["$scope"];

export const nameDetailAssociates = {
  bindings: {
    associates: "<"
  },
  controller: associatesController,
  template: require('./nameDetailAssociates.component.html')
};

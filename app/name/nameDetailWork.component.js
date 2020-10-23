class workController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

workController.$inject = ["$scope"];

export const nameDetailWork = {
  bindings: {
    name: "<"
  },
  controller: workController,
  template: require('./nameDetailWork.component.html')
};

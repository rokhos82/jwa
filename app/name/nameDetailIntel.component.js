class intelController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

intelController.$inject = ["$scope"];

export const nameDetailIntel = {
  bindings: {
    name: "<"
  },
  controller: intelController,
  template: require('./nameDetailIntel.component.html')
};

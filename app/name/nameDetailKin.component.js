class kinController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

kinController.$inject = ["$scope"];

export const nameDetailKin = {
  bindings: {
    kin: "<"
  },
  controller: kinController,
  template: require('./nameDetailKin.component.html')
};

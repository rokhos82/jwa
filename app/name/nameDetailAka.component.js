class akaController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

akaController.$inject = ["$scope"];

export const nameDetailAka = {
  bindings: {
    name: "<"
  },
  controller: akaController,
  template: require('./nameDetailAka.component.html')
};

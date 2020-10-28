class incidentSearchController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentSearchController.$inject = ["$scope"];

export const incidentSearch = {
  bindings: {},
  controller: incidentSearchController,
  template: require('./incidentSearch.component.html')
};

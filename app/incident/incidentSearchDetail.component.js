class incidentSearchDetailController  {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentSearchDetailController .$inject = ["$scope"];

export const incidentSearchDetail = {
  bindings: {},
  controller: incidentSearchDetailController ,
  template: require('./incidentSearchDetail.component.html')
};

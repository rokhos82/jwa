class incidentSearchDetailController  {
  constructor($scope) {
    this.$scope = $scope;
  }

  onFirst() {}

  onPrev() {}

  onNext() {}

  onLast() {}
}

incidentSearchDetailController .$inject = ["$scope"];

export const incidentSearchDetail = {
  bindings: {
    incidentnumber: "<",
    incidents: "<"
  },
  controller: incidentSearchDetailController ,
  template: require('./incidentSearchDetail.component.html')
};

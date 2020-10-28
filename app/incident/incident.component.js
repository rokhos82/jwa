class incidentController {
  constructor($scope,$state,$transition) {
    this.$scope = $scope;
  }
}

incidentController.$inject = ["$scope","$state","$transitions"];

export const incident = {
  bindings: {},
  controller: incidentController,
  template: require('./incident.component.html')
};

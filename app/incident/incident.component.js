class incidentController {
  constructor($scope,$state,$transition) {
    this.$scope = $scope;
    this.$state = $state;
  }
}

incidentController.$inject = ["$scope","$state","$transitions"];

export const incident = {
  bindings: {},
  controller: incidentController,
  template: require('./incident.component.html')
};

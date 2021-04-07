/**
 * @class moduleName.incidentDetailBlotter
 * @memberOf moduleName
 * @desc
 */
class incidentDetailBlotterController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentDetailBlotterController.$inject = ["$scope"];

export const incidentDetailBlotter = {
  bindings: {
    blotter: "<"
  },
  controller: incidentDetailBlotterController,
  template: require('./incidentDetailBlotter.component.html')
};

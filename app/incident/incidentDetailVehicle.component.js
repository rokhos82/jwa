/**
 * @class INCIDENT_MODULE.incidentDetailVehicle
 * @memberOf INCIDENT_MODULE
 * @desc The component for the vehicles associated with an incident
 */
class incidentDetailVehicleController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentDetailVehicleController.$inject = ["$scope"];

export const incidentDetailVehicle = {
  bindings: {
    vehicles: "<"
  },
  controller: incidentDetailVehicleController,
  template: require('./incidentDetailVehicle.component.html')
};

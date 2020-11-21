/**
 * @class INCIDENT_MODULE.incidentDetailProperty
 * @memberOf INCIDENT_MODULE
 * @desc The component for the property related to an incident
 */
class incidentDetailPropertyController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentDetailPropertyController.$inject = ["$scope"];

export const incidentDetailProperty = {
  bindings: {},
  controller: incidentDetailPropertyController,
  template: require('./incidentDetailProperty.component.html')
};

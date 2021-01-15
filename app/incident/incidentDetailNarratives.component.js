/**
 * @class INCIDENT_MODULE.incidentDetailNarratives
 * @memberOf INCIDENT_MODULE
 * @desc
 */
class incidentDetailNarrativesController {
  constructor($scope,$state) {
    this.$scope = $scope;
    this.$state = $state;
  }

  viewNarrative(narrativekey) {
    console.log(narrativekey);
    this.$state.transitionTo("incidentSearchNarrativeDetail",{ narrativekey: narrativekey });
  }
}

incidentDetailNarrativesController.$inject = ["$scope","$state"];

export const incidentDetailNarratives = {
  bindings: {
    narratives: "<"
  },
  controller: incidentDetailNarrativesController,
  template: require('./incidentDetailNarratives.component.html')
};

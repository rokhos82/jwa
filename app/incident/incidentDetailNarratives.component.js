/**
 * @class INCIDENT_MODULE.incidentDetailNarratives
 * @memberOf INCIDENT_MODULE
 * @desc
 */
class incidentDetailNarrativesController {
  constructor($scope,$state,$uibModal) {
    this.$scope = $scope;
    this.$state = $state;
    this.$uibModal = $uibModal;
  }

  viewNarrative(narrativekey) {
    console.log(narrativekey);
    //this.$state.transitionTo("incidentSearchNarrativeDetail",{ narrativekey: narrativekey });
    let instance = this.$uibModal.open({
      animation: false,
      component: 'narrativeDetail',
      size: "lg",
      resolve: {
        narrativekey: () => {
          return narrativekey;
        }
      }
    });

    instance.result.then((selectedItem) => {
      console.log("Modal closed");
    });
  }
}

incidentDetailNarrativesController.$inject = ["$scope","$state","$uibModal"];

export const incidentDetailNarratives = {
  bindings: {
    narratives: "<"
  },
  controller: incidentDetailNarrativesController,
  template: require('./incidentDetailNarratives.component.html')
};

/**
 * @class INCIDENT_MODULE.narrativeDetail
 * @memberOf INCIDENT_MODULE
 * @desc Narrative Detail Pane
 */
class narrativeDetailController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;
  }

  $onInit() {
    this.narrativekey = this.resolve.narrativekey;
    this.incidentService.getNarrative(this.narrativekey).then((result) => {
      console.log('Narrative',result);
      this.narrative = result[0];
    });
  }
}

narrativeDetailController.$inject = ["$scope","incidentService"];

export const narrativeDetail = {
  bindings: {
    resolve: "<",
    narrativekey: "<"
  },
  controller: narrativeDetailController,
  template: require('./narrativeDetail.component.html')
};

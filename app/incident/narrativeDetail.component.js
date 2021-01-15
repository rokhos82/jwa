/**
 * @class INCIDENT_MODULE.narrativeDetail
 * @memberOf INCIDENT_MODULE
 * @desc Narrative Detail Pane
 */
class narrativeDetailController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

narrativeDetailController.$inject = ["$scope"];

export const narrativeDetail = {
  bindings: {
    narrativekey: "="
  },
  controller: narrativeDetailController,
  template: require('./narrativeDetail.component.html')
};

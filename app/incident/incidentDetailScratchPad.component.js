/**
 * @class moduleName.incidentDetailScratchPad
 * @memberOf moduleName
 * @desc
 */
class incidentDetailScratchPadController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

incidentDetailScratchPadController.$inject = ["$scope"];

export const incidentDetailScratchPad = {
  bindings: {
    scratchpad: "<"
  },
  controller: incidentDetailScratchPadController,
  template: require('./incidentDetailScratchPad.component.html')
};

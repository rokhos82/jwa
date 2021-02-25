/**
 * @class ADMIN_MODULE.auditList
 * @memberOf ADMIN_MODULE
 * @desc Lists the audit events
 */
class auditListController {
  constructor($scope,auditService) {
    this.$scope = $scope;
    this.auditService =  auditService;
  }

  $onInit() {
  }
}

auditListController.$inject = ["$scope","auditService"];

export const auditList = {
  bindings: {
    events: "<"
  },
  controller: auditListController,
  template: require('./auditList.component.html')
};

/**
 * @class USER_MODULE.adminRoot
 * @memberOf USER_MODULE
 * @desc The root of the user admin module
 */
class adminRootController {
  constructor($scope,adminService) {
    this.$scope = $scope;
    this.adminService = adminService;
  }
}

adminRootController.$inject = ["$scope","adminService"];

export const adminRoot = {
  bindings: {},
  controller: adminRootController,
  template: require('./adminRoot.component.html')
};

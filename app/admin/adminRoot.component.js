/**
 * @class USER_MODULE.adminRoot
 * @memberOf USER_MODULE
 * @desc The root of the user admin module
 */
class adminRootController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

adminRootController.$inject = ["$scope"];

export const adminRoot = {
  bindings: {},
  controller: adminRootController,
  template: require('./adminRoot.component.html')
};

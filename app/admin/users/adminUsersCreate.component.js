/**
 * @class ADMIN_MODULE.adminUsersCreate
 * @memberOf ADMIN_MODULE
 * @desc Panel for creating new users
 */
class adminUsersCreateController {
  constructor($scope,adminService) {
    this.$scope = $scope;
    this.adminService = adminService;
  }
}

adminUsersCreateController.$inject = ["$scope","adminService"];

export const adminUsersCreate = {
  bindings: {},
  controller: adminUsersCreateController,
  template: require('./adminUsersCreate.component.html')
};

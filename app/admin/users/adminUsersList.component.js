/**
 * @class ADMIN_MODULE.adminUsersList
 * @memberOf ADMIN_MODULE
 * @desc Listing the users
 */
class adminUsersListController {
  constructor($scope,adminService) {
    this.$scope = $scope;
    this.adminService = adminService;
  }

  $onInit() {
    this.adminService.getUserInfo();
  }
}

adminUsersListController.$inject = ["$scope","adminService"];

export const adminUsersList = {
  bindings: {},
  controller: adminUsersListController,
  template: require('./adminUsersList.component.html')
};

/**
 * @class ADMIN_MODULE.adminUsers
 * @memberOf ADMIN_MODULE
 * @desc User admin panel
 */
class adminUsersController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

adminUsersController.$inject = ["$scope"];

export const adminUsers = {
  bindings: {},
  controller: adminUsersController,
  template: require('./adminUsers.component.html')
};

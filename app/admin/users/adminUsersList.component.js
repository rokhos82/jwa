/**
 * @class ADMIN_MODULE.adminUsersList
 * @memberOf ADMIN_MODULE
 * @desc Listing the users
 */
class adminUsersListController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

adminUsersListController.$inject = ["$scope"];

export const adminUsersList = {
  bindings: {},
  controller: adminUsersListController,
  template: require('./adminUsersList.component.html')
};

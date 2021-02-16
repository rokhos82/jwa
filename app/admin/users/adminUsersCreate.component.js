/**
 * @class ADMIN_MODULE.adminUsersCreate
 * @memberOf ADMIN_MODULE
 * @desc Panel for creating new users
 */
class adminUsersCreateController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

adminUsersCreateController.$inject = ["$scope"];

export const adminUsersCreate = {
  bindings: {},
  controller: adminUsersCreateController,
  template: require('./adminUsersCreate.component.html')
};

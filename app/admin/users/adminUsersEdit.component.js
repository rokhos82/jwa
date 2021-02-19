/**
 * @class ADMIN_MODULE.adminUserEdit
 * @memberOf ADMIN_MODULE
 * @desc User edit panel
 */
class adminUsersEditController {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.user.then((result) => {
      this.user = result;
      console.log(this.user);
    });
  }
}

adminUsersEditController.$inject = ["$scope"];

export const adminUsersEdit = {
  bindings: {
    user: "<"
  },
  controller: adminUsersEditController,
  template: require('./adminUsersEdit.component.html')
};

/**
 * @class ADMIN_MODULE.adminUsersList
 * @memberOf ADMIN_MODULE
 * @desc Listing the users
 */
class adminUsersListController {
  constructor($scope,adminService) {
    this.$scope = $scope;
    this.adminService = adminService;
    this.info = {};
  }

  $onInit() {
    let userResults = this.adminService.getUserInfo();
    userResults.then((results) => {
      this.info.users = results;
    }).catch((err) => {
      console.log(err);
    });
  }
}

adminUsersListController.$inject = ["$scope","adminService"];

export const adminUsersList = {
  bindings: {},
  controller: adminUsersListController,
  template: require('./adminUsersList.component.html')
};

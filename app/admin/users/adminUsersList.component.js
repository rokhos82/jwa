/**
 * @class ADMIN_MODULE.adminUsersList
 * @memberOf ADMIN_MODULE
 * @desc Listing the users
 */
class adminUsersListController {
  constructor($scope,adminService,$state,$uibModal) {
    this.$scope = $scope;
    this.adminService = adminService;
    this.$state = $state;
    this.info = {};
    this.$uibModal = $uibModal;
  }

  $onInit() {
    let userResults = this.adminService.getUserInfo();
    userResults.then((results) => {
      this.info.users = results;
    }).catch((err) => {
      console.log(err);
    });
  }

  editUser(userId) {
    this.$state.go("adminUsersEdit",{userId: userId});
  }

  resetPassword(userId) {
    console.log("Password Reset for " + userId);
    let instance = this.$uibModal.open({
      animate: false,
      keyboard: true,
      component: "passwordReset",
      resolve: {
        userId: () => {
          return userId
        }
      }
    });
  }
}

adminUsersListController.$inject = ["$scope","adminService","$state","$uibModal"];

export const adminUsersList = {
  bindings: {},
  controller: adminUsersListController,
  template: require('./adminUsersList.component.html')
};

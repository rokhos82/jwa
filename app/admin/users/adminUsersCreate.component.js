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

  $onInit() {
    this.info = {};
    angular.element("firstName").focus();
  }

  createUser() {
    console.log(this.info);
    this.adminService.createUser(this.info.firstName,this.info.lastName,this.info.username,this.info.password,["user"]);
  }
}

adminUsersCreateController.$inject = ["$scope","adminService"];

export const adminUsersCreate = {
  bindings: {},
  controller: adminUsersCreateController,
  template: require('./adminUsersCreate.component.html')
};

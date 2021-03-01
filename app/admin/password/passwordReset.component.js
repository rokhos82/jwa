/**
 * @class jwa-admin.passwordReset
 * @memberOf jwa-admin
 * @desc Allows a user to reset the password of the provided user.
 */
class passwordResetController {
  constructor($scope,$resource,adminService) {
    this.$scope = $scope;
    this.$resource = $resource;
    this.adminService = adminService;
  }

  $onInit() {
    this.userId = this.resolve.userId;
  }

  reset() {
    console.log("Doing password reset");

    if(this.passwordFirst == this.passwordSecond) {
      this.adminService.resetPassword(this.userId,this.currentPassword,this.passwordFirst);
    }
    else {
      console.log("Password's don't match");
    }
  }
}

passwordResetController.$inject = ["$scope","$resource","adminService"];

export const passwordReset = {
  bindings: {
    resolve: "<",
    modalInstance: "<"
  },
  controller: passwordResetController,
  template: require('./passwordReset.component.html')
};

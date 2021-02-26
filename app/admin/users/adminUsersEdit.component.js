/**
 * @class ADMIN_MODULE.adminUserEdit
 * @memberOf ADMIN_MODULE
 * @desc User edit panel
 */
class adminUsersEditController {
  constructor($scope,adminService,$state) {
    this.$scope = $scope;
    this.adminService = adminService;
    this.$state = $state;
    this.agencies = {};
  }

  $onInit() {
    this.adminService.getRoleInfo().then((results) => {
      this.roles = results;
    }).finally(() => {
      // Get the roles from the user and update the local roles for the UI
      _.forEach(this.roles,(role) => {
        role.active = _.includes(this.user.roles,role._id);
      });
    });

    this.adminService.getAgencyInfo().then((results) => {
      _.forEach(results,(result) => {
        this.agencies[result._id] = result;
      });
    }).finally(() => {
      if(this.user.agencyId) {
        this.agency = this.agencies[this.user.agencyId];
      }
    });
  }

  cancel() {
    // Just ignore everything and go back to the list view
    this.$state.go("adminUsersList");
  }

  update() {
    // Get the roles compiled.
    // Send the updated information to the back-end.
    // If successful, then go back to the list view.
    // Otherwise, display the error message to the user.
    let roles = [];
    _.forEach(this.roles,(role) => {
      if(role.active) {
        roles.push(role._id);
      }
    });

    this.adminService.updateUser(this.user._id,this.user.name.first,this.user.name.last,this.user.username,roles).then(() => {
      this.$state.go("adminUsersList");
    }).catch((err) => {
      console.error(err);
    });
  }
}

adminUsersEditController.$inject = ["$scope","adminService","$state"];

export const adminUsersEdit = {
  bindings: {
    user: "<"
  },
  controller: adminUsersEditController,
  template: require("./adminUsersEdit.component.html")
};

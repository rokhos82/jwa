class incidentDetailContactsController {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {}
}

incidentDetailContactsController.$inject = ["$scope"];

export const incidentDetailContacts = {
  bindings: {
    incidentnumber: "@"
  },
  controller: incidentDetailContactsController,
  template: require('./incidentDetailContacts.component.html')
};

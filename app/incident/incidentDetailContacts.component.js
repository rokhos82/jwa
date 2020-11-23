class incidentDetailContactsController {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {}
}

incidentDetailContactsController.$inject = ["$scope"];

export const incidentDetailContacts = {
  bindings: {
    contacts: "<"
  },
  controller: incidentDetailContactsController,
  template: require('./incidentDetailContacts.component.html')
};

class incidentListController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;
  }

  $onInit() {
    this.incidentService.masterIncidentTop1000().then((records) => {
      console.log("Incidents",records);
      this.incidents = records;
    })
  }
}

incidentListController.$inject = ["$scope","incidentService"];

export const incidentList = {
  bindings: {},
  controller: incidentListController,
  template: require('./incidentList.component.html')
};

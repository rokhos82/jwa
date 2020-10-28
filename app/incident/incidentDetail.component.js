class incidentDetailController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;

    this.incident = null;
  }

  $onInit() {
    this.incidentService.getIncidentDetail(this.incidentnumber).then((result) => {
      console.log('Detail',result);
    });
  }
}

incidentDetailController.$inject = ["$scope","incidentService"];

export const incidentDetail = {
  bindings: {
    incidentnumber: "<"
  },
  controller: incidentDetailController,
  template: require('./incidentDetail.component.html')
};

class incidentListController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
    this.page = 1;
    this.maxPage = -1;
  }

  $onInit() {
    this.fetchRecords();
  }

  nextPage() {
    this.page++;
    this.recordOffset += this.fetchSize;
    this.fetchRecords();
  }

  prevPage() {
    this.page--;
    if(this.page > 0) {
      this.recordOffset -= this.fetchSize;
      this.fetchRecords();
    }
    else {
      this.page = 1;
    }
  }

  fetchRecords() {
    this.incidentService.getIncidents(this.recordOffset,this.fetchSize).then((results) => {
      console.log("Incidents",results);
      this.incidents = results.recordsets[0];
      this.recordCount = results.recordsets[1][0].Count;
    })
  }
}

incidentListController.$inject = ["$scope","incidentService"];

export const incidentList = {
  bindings: {},
  controller: incidentListController,
  template: require('./incidentList.component.html')
};

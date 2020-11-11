class incidentListController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
    this.page = 1;
    this.loading = true;
  }

  $onInit() {
    this.loading = true;
  }

  $onChanges(changeObj) {
    let terms = changeObj.query.currentValue;
    console.log(`New Query`,terms);
    this.terms = terms;

    this.recordOffset = 0;
    this.page = 1;

    this.fetchRecords();
    this.changePage();
  }

  changePage() {
    console.log("Page",this.page);
    this.loading = true;
    this.recordOffset = (this.page-1) * this.fetchSize;
    this.fetchRecords();
  }

  fetchRecords() {
    let terms = this.terms || {};
    console.log("Incident Search terms",terms);
    terms.recordOffset = this.recordOffset;
    terms.fetchSize = this.fetchSize;

    this.incidentService.getIncidents(terms).then((results) => {
      console.log("Incidents",results);
      this.incidents = results.recordsets[0];
      this.recordCount = results.recordsets[1][0].Count;
    }).finally(() => {
      this.loading = false;
    });
  }
}

incidentListController.$inject = ["$scope","incidentService"];

export const incidentList = {
  bindings: {
    query: "<"
  },
  controller: incidentListController,
  template: require('./incidentList.component.html')
};

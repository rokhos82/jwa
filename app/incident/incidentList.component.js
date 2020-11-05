class incidentListController {
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
    this.page = 1;
    this.maxPage = -1;
    this.loading = true;
  }

  $onInit() {
    this.loading = true;
    this.fetchRecords();
  }

  $onChanges(changeObj) {
    let terms = changeObj.query.currentValue;
    console.log(`New Query`,terms);
    this.terms = terms;

    this.recordOffset = 0;
    this.page = 1;

    this.fetchRecords();
  }

  nextPage() {
    this.loading = true;
    this.page++;
    this.recordOffset += this.fetchSize;
    this.incidents = [];
    this.fetchRecords();
  }

  prevPage() {
    this.loading = true;
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

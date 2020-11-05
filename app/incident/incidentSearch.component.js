class incidentSearchController {
  constructor($scope) {
    this.$scope = $scope;

    this.ui = {
      incident: ""
    };

    this.searchCount = 1;
  }

  $onInit() {
    this.searchCount = 1;
  }

  search() {
    console.log(`New Incident Search`,this.ui);

    this.query = _.cloneDeep(this.ui);
    this.query[this.searchCount] = this.searchCount;
    this.searchCount++;
  }
}

incidentSearchController.$inject = ["$scope"];

export const incidentSearch = {
  bindings: {},
  controller: incidentSearchController,
  template: require('./incidentSearch.component.html')
};

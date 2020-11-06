class incidentSearchController {
  /**
   * incidentSearchController consturctor.
   * @constructor
   */
  constructor($scope,incidentService) {
    this.$scope = $scope;
    this.incidentService = incidentService;

    this.ui = {
      incident: ""
    };

    this.searchCount = 1;

    this.terms = {};
    this.results = [];
    this.incidentList = [];
  }

  $onInit() {
    this.searchCount = 1;
  }

  /**
   * Executes an incident search.
   * Builds the search terms from the internal this.ui object
   */
  doSearch(terms) {
    console.log(`New Incident Search`,this.ui);

    this.query = _.cloneDeep(this.ui);
    this.query[this.searchCount] = this.searchCount;
    this.searchCount++;
  }

  buildIncidentList() {
    // This function build an array of incident numbers when a search has been executed
  }
}

incidentSearchController.$inject = ["$scope","incidentService"];

export const incidentSearch = {
  bindings: {},
  controller: incidentSearchController,
  template: require('./incidentSearch.component.html')
};

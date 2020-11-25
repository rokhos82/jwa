class nameDetailController {
  constructor($scope,nameService,$state,$transitions,dateFilter,timeFilter) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;
    this.dateFilter = dateFilter;
    this.timeFilter = timeFilter;

    this.loading = true;
  }

  $onInit() {
    console.log(this.filenumber);

    this.nameService.getNameDetail(this.filenumber).then((result) => {
      console.log('Detail',result);
      this.name = result[0].detail;
      this.contacts = result[0].contacts;
      this.cleanupDateTime();
    }).finally(() => {
      this.loading = false;
    });
  }

  cleanupDateTime() {
    this.name.DOB = this.dateFilter(this.name.DOB);
  }
}

nameDetailController.$inject = ['$scope','nameService','$state','$transitions',"dateFilter","timeFilter"];

/**
 * nameDetail state definition
 * @type {object}
 */
export const nameDetail = {
  /**
   * The ui-router state binding information
   * @type {object}
   */
  bindings: {
    filenumber: '<'
  },
  controller: nameDetailController,
  template: require('./nameDetail.component.html')
};

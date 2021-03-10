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
    this.name = this.info[0].detail;
    this.contacts = this.info[0].contacts;
    this.aliases = this.info[0].aliases;
    this.associates = this.info[0].associates;
    this.cleanupDateTime();

    this.loading = false;

    this.$scope.showDebug = false;
  }

  cleanupDateTime() {
    this.name.DOB = this.dateFilter(this.name.DOB);
    _.forEach(this.associates,(associate) => {
      associate.DOB = this.dateFilter(associate.DOB);
      associate.Date = this.dateFilter(associate.Date);
    });
  }
}

nameDetailController.$inject = ['$scope','nameService','$state','$transitions',"dateFilter","timeFilter"];

export const nameDetail = {
  bindings: {
    info: '<'
  },
  controller: nameDetailController,
  template: require('./nameDetail.component.html')
};

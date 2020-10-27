class nameSearchController {
  constructor($scope,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$scope = $scope;

    this.searchCount = 1;
    this.query = {};
  }

  search() {
    console.log(`New Search`,this.ui);

    this.query = _.cloneDeep(this.ui);
    this.query[this.searchCount] = this.searchCount;
    this.searchCount++;
  }
}

nameSearchController.$inject = ['$scope','$state','$transitions'];

export const nameSearch = {
  bindings: {
    onSearch: "&"
  },
  controller: nameSearchController,
  template: require('./nameSearch.component.html')
};

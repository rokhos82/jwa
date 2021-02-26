class nameSearchController {
  constructor($scope,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$scope = $scope;

    this.query = {};
    this.ui = {};
  }

  $onInit() {
  }

  search() {
    console.log(`New Search`,this.ui);

    this.query = _.cloneDeep(this.ui);
    this.$scope.$broadcast("jwa-names-search",{terms: this.query});
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

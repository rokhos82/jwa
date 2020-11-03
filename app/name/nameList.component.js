class nameListController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;

    this.load = true;

    this.page = 1;
    this.maxPage = -1;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
  }

  $onInit() {
    this.nameService.masterNamesTop1000().then((result) => {
      console.log(result);
      this.names = result.recordset;
    });
  }

  $onChanges(changeObj) {
    let terms = changeObj.query.currentValue;
    console.log(`New Query`,terms);

    if(_.isObject(terms) && _.has(terms,'lastName')) {
      this.nameService.masterNamesSearch(terms).then((result) => {
        console.log(result);
        this.names = result.recordset;
      });
    }
  }

  nextPage() {}

  prevPage() {}

  fetchRecords() {
    this.nameService.getNames(terms).then((results) => {
      console.log(results);
      this.names = results.recordsets[0];
      this.recordCount = results.recordsets[1][0];
    }).finally(() => {
      this.loading = false;
    });
  }
}

nameListController.$inject = ['$scope','nameService','$state','$transitions'];

export const nameList = {
  bindings: {
    query: "<"
  },
  controller: nameListController,
  template: require("./nameList.component.html")
};

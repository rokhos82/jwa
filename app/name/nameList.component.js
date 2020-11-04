class nameListController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;

    this.loading = true;
    this.terms = null;

    this.page = 1;
    this.maxPage = -1;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
  }

  $onInit() {
    this.fetchRecords();
  }

  $onChanges(changeObj) {
    let terms = changeObj.query.currentValue;
    console.log(`New Query`,terms);
    this.terms = terms;

    /*if(_.isObject(terms) && _.has(terms,'lastName')) {
      this.nameService.masterNamesSearch(terms).then((result) => {
        console.log(result);
        this.names = result.recordset;
      });
    }//*/
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

  nextPage() {
    this.loading = true;
    this.page++;
    this.recordOffset += this.fetchSize;
    this.incidents = [];
    this.fetchRecords();
  }

  fetchRecords() {
    // Add the record offset and fetch next size for SQL query to the
    // search terms object.
    let terms = this.terms || {};
    terms.recordOffset = this.recordOffset;
    terms.fetchSize = this.fetchSize;

    this.nameService.getNames(terms).then((results) => {
      console.log(results);
      this.names = results.recordsets[0];
      this.recordCount = results.recordsets[1][0].Count;
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

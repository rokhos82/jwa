class nameListController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;
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
}

nameListController.$inject = ['$scope','nameService','$state','$transitions'];

export const nameList = {
  bindings: {
    query: "<"
  },
  controller: nameListController,
  template: require("./nameList.component.html")
};

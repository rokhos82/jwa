class nameListController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;
  }

  $onInit() {
    this.nameService.masterNamesTop1000().then((recordset) => {
      this.names = recordset.set;
    });
  }

  $onChanges(changeObj) {
    let terms = changeObj.query.currentValue;
    console.log(`New Query`,terms);

    if(_.isObject(terms) && _.has(terms,'lastName')) {
      this.nameService.masterNamesSearch(terms).then((recordset) => {
        this.names = recordset.set;
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
  template: `
  <fieldset>
    <legend>Search Results</legend>
    <div class="jwa-master-names-list-scroll">
      <table class="jwa-master-names-table">
        <tr><th>File Number</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>DOB</th></tr>
        <tr ng-repeat="name in $ctrl.names">
          <td><a ui-sref="detail({filenumber:name.FileNumber})">{{name.FileNumber}}</a></td>
          <td>{{name.First}}</td>
          <td>{{name.Middle}}</td>
          <td>{{name.LastName}}</td>
          <td>{{name.DOB}}</td>
        </tr>
      </table>
    </div>
  </fieldset>`
};

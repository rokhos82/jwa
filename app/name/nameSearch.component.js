class nameSearchController {
  constructor($scope,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$scope = $scope;
  }

  search() {
    console.log(`New Search`,this.ui);
    this.onSearch({ui:this.ui});
  }
}

nameSearchController.$inject = ['$scope','$state','$transitions'];

export const nameSearch = {
  bindings: {
    onSearch: "&"
  },
  controller: nameSearchController,
  template: `
  <fieldset>
    <legend>Name Record Search</legend>
    <container class="jwa_form_line">
      <label for="searchLastName">Last Name</label><input id="searchLastName" ng-model="$ctrl.ui.lastName" type="text" />
      <label for="searchFirstName">First Name</label><input id="searchFirstName" ng-model="$ctrl.ui.firstName" type="text" />
      <label for="searchMiddleName">Middle Name</label><input id="searchMiddleName" ng-model="$ctrl.ui.middleName" type="text" />
    </container>
    <container class="jwa_form_line">
      <button ng-click="$ctrl.search()">Search</button>
      <button ng-click="">List All Names</button>
    </container>
  </fieldset>`
};

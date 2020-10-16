class nameSearchController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
  }

  searchNameNumber() {
    let name = $resource('http://localhost:8001/names/:fileNumber',{
      fileNumber: this.fileNumber
    });

    name.query().$promise.then((n) => {
      console.log(n[0]);
    });
  }

  searchName() {
    let searchApi = this.$resource('http://localhost:8001/names/search',{});

    console.log(this.ui);

    let searchPromise = searchApi.save({},this.ui).$promise;
    searchPromise.then((res) => {
      console.log(res.set);
      this.names = res.set;
    });
  }
}

nameSearchController.$inject = ['$scope','$resource','$state','$transitions'];

export const nameSearch = {
  controller: nameSearchController,
  template: `
  <fieldset>
    <legend>Name Record Search</legend>
    <container class="jwa_form_line">
      <label for="fileNumber">File Number:</label><input id="fileNumber" type="number" ng-model="$ctrl.ui.fileNumber" />
    </container>
    <container class="jwa_form_line">
      <label for="lastName">Last Name</label><input id="lastName" ng-model="$ctrl.ui.lastName" type="text" />
      <label for="firstName">First Name</label><input id="firstName" ng-model="$ctrl.ui.firstName" type="text" />
      <label for="middleName">Middle Name</label><input id="middleName" ng-model="$ctrl.ui.middleName" type="text" />
    </container>
    <container class="jwa_form_line">
      <button ng-click="$ctrl.searchName()">Search</button>
      <button ng-click="">List All Names</button>
    </container>
  </fieldset>`
};

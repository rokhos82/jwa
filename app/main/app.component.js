/**
 * The controller for the `app` component
 */
class appController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;

    this.greeting = "Justice Web App" + " v0.1.0";
    this.names = "";

    this.ui = {};
    this.ui.firstName = "";
    this.ui.middileName = "";
    this.ui.lastName = "";
    this.ui.fileNumber = undefined;
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
};

appController.$inject = ['$scope','$resource','$state','$transitions'];

export const app = {
  controller: appController,
  template: `
  <container>
    <h1>{{$ctrl.greeting}}</h1>
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
    </fieldset>
    <table>
      <tr><th>File Number</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>DOB</th></tr>
      <tr ng-repeat="name in $ctrl.names">
        <td>{{name.FileNumber}}</td>
        <td>{{name.First}}</td>
        <td>{{name.Middle}}</td>
        <td>{{name.LastName}}</td>
        <td>{{name.DOB}}</td>
      </tr>
    </table>
  </container>`
}

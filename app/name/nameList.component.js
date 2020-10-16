class nameListController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;
  }
}

nameListController.$inject = ['$scope','$resource','$state','$transitions'];

export const nameList = {
  controller: nameListController,
  template: `
  <fieldset>
    <legend>Search Results</legend>
    <table>
      <tr><th>File Number</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>DOB</th></tr>
      <tr ng-repeat="name in $ctrl.names">
        <td><a ui-sref="detail({filenumber:name.FileNumber})">{{name.FileNumber}}</a></td>
        <td>{{name.First}}</td>
        <td>{{name.Middle}}</td>
        <td>{{name.LastName}}</td>
        <td>{{name.DOB}}</td>
      </tr>
    </table>
  </fieldset>`
};

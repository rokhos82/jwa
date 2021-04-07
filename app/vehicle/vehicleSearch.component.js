/**
 * @class jwa-vehicle.vehicleSearch
 * @memberOf jwa-vehicle
 * @desc The main search dialog
 */
class vehicleSearchController {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.ui = {};
    this.query = "";
  }

  doSearch() {}
}

vehicleSearchController.$inject = ["$scope"];

export const vehicleSearch = {
  bindings: {},
  controller: vehicleSearchController,
  template: require('./vehicleSearch.component.html')
};

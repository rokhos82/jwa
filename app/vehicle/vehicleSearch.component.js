/**
 * @class jwa-vehicle.vehicleSearch
 * @memberOf jwa-vehicle
 * @desc The main search dialog
 */
class vehicleSearchController {
  constructor($scope,vehicleService) {
    this.$scope = $scope;
    this.service = vehicleService;

    this.ui = {};
    this.query = {};
  }

  $onInit() {
  }

  doSearch() {
    console.log(`New Vehicle Search`,this.ui);
    this.query = _.cloneDeep(this.ui);
    this.$scope.$broadcast("jwa-vehicle-search",{terms: this.query});
    //this.service.getVehicles(this.ui);
  }
}

vehicleSearchController.$inject = ["$scope","vehicleService"];

export const vehicleSearch = {
  bindings: {},
  controller: vehicleSearchController,
  template: require('./vehicleSearch.component.html')
};

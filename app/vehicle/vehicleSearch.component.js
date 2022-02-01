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
    this.lookups = {};
  }

  $onInit() {
    this.service.getVehicleLookups().then((results) => {
      console.log(results);
      this.lookups = results;
    }).catch(() => {
      console.log("Error in vehicle lookup GET request");
    });
  }

  doSearch() {
    console.log(`New Vehicle Search`,this.ui);
    this.query = _.cloneDeep(this.ui);
    this.$scope.$broadcast("jwa-vehicle-search",{terms: this.query});
  }
}

vehicleSearchController.$inject = ["$scope","vehicleService"];

export const vehicleSearch = {
  bindings: {},
  controller: vehicleSearchController,
  template: require('./vehicleSearch.component.html')
};

/**
 * @class jwa-vehicle.vehicleDetail
 * @memberOf jwa-vehicle
 * @desc Detail record of a vehicle
 */
class vehicleDetailController {
  constructor($scope,service,dateFilter) {
    this.$scope = $scope;
    this.service = service;
    this.dateFilter = dateFilter;

    this.loading = true;
  }

  $onInit() {
    this.vehicle = this.info.vehicle;

    this.cleanupDateTime();

    this.loading = false;
  }

  cleanupDateTime() {
    this.vehicle.contactDate = this.dateFilter(this.vehicle.contactDate);
    this.vehicle.releaseDate = this.dateFilter(this.vehicle.releaseDate);
  }
}

vehicleDetailController.$inject = ["$scope","vehicleService","dateFilter"];

export const vehicleDetail = {
  bindings: {
    info: '<'
  },
  controller: vehicleDetailController,
  template: require('./vehicleDetail.component.html')
};

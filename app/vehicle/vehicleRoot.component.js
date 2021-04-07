/**
 * @class jwa-vehicle.vehicleRoot
 * @memberOf jwa-vehicle
 * @desc The root component of the vehicle module
 */
class vehicleRootController {
  constructor($scope,$state) {
    this.$scope = $scope;
    this.$state = $state;
  }
}

vehicleRootController.$inject = ["$scope","$state"];

export const vehicleRoot = {
  bindings: {},
  controller: vehicleRootController,
  template: require('./vehicleRoot.component.html')
};

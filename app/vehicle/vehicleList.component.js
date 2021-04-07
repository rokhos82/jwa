/**
 * @class jwa-vehicle.vehicleList
 * @memberOf jwa-vehicle
 * @desc Search query return list
 */
class vehicleListController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

vehicleListController.$inject = ["$scope"];

export const vehicleList = {
  bindings: {},
  controller: vehicleListController,
  template: require('./vehicleList.component.html')
};

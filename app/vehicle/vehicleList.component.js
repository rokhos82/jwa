/**
 * @class jwa-vehicle.vehicleList
 * @memberOf jwa-vehicle
 * @desc Search query return list
 */
class vehicleListController {
  constructor($scope,service) {
    this.$scope = $scope;
    this.service = service;

    this.loading = true;
    this.terms = null;

    this.page = 1;

    this.recordOffset = 0;
    this.fetchSize = 100;
    this.recordCount = 0;
  }

  $onInit() {
    this.loading = true;

    this.$scope.$on("jwa-vehicle-search",(event,data) => {
      this.terms = data.terms;
      this.recordOffset = 0;
      this.page = 1;
      this.loading = true;

      this.fetchRecords();
    });

    this.fetchRecords();
  }

  fetchRecords() {
    let terms = this.terms || {};
    console.log("Vehicle search terms",terms);

    terms.recordOffset = this.recordOffset;
    terms.fetchSize = this.fetchSize;

    this.service.getVehicles(terms).then((results) => {
      console.log(results);
      this.rows = results.rows;
      this.recordCount = results.count;
    }).catch(() => {
      console.log('Some error');
    }).finally(() => {
      this.loading = false;
    });
  }

  changePage() {
    this.loading = true;
    this.recordOffset = (this.page-1)*this.fetchSize;
    this.fetchRecords();
  }
}

vehicleListController.$inject = ["$scope","vehicleService"];

export const vehicleList = {
  bindings: {},
  controller: vehicleListController,
  template: require('./vehicleList.component.html')
};

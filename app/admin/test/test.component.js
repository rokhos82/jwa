/**
 * @class jwa-admin.testComponent
 * @memberOf jwa-admin
 * @desc For testing things
 */
class testComponentController {
  constructor($scope,testService,$cookies) {
    this.$scope = $scope;
    this.test = testService;
    this.$cookies = $cookies;
  }

  $onInit() {
    this.test.getTest().then(
      (result) => {
        console.log(result);
        console.log(this.$cookies.getAll());
      },
      () => { console.log("rejected"); },
      () => { console.log("here"); }
    );
  }
}

testComponentController.$inject = ["$scope","testService","$cookies"];

export const testComponent = {
  bindings: {},
  controller: testComponentController,
  template: require('./test.component.html')
};

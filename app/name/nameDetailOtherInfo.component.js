class otherInfoController {
  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {}
}

otherInfoController.$inject = ["$scope"];

export const nameDetailOtherInfo = {
  bindings: {
    name: "<"
  },
  controller: otherInfoController,
  template: require('./nameDetailOtherInfo.component.html')
};

class commentsController {
  constructor($scope) {
    this.$scope = $scope;
  }
}

commentsController.$inject = ["$scope"];

export const nameDetailComments = {
  bindings: {
    name: "<"
  },
  controller: commentsController,
  template: require('./nameDetailComments.component.html')
};

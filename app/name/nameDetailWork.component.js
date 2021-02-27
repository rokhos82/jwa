class workController {
  constructor($scope) {
    this.$scope = $scope;

    this.labels = [
      "Court Service Officer",
      "Home Detention Officer",
      "Judge",
      "DOC/JCA",
      "Counseler",
      "Clergy",
      "Legal Guardian",
      "Doctor",
      "Attorney",
      "Insurance/Other"
    ];
  }

  $onInit() {
    this.professionals = _.split(this.name.Professionals,"\n");
  }
}

workController.$inject = ["$scope"];

export const nameDetailWork = {
  bindings: {
    name: "<"
  },
  controller: workController,
  template: require('./nameDetailWork.component.html')
};

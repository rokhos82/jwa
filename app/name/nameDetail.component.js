class nameDetailController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;
  }

  $onInit() {
    console.log(this.filenumber);

    this.nameService.getNameDetailByFilenumber(this.filenumber).then((n) => {
      console.log(n);
      this.name = n[0];
    });

    this.nameService.getNameContacts(this.filenumber).then((n) => {
      console.log(n);
      this.nameContacts = n.recordset;
    });

    console.log(this.search);
    this.searched = _.isObject(this.search);
  }
}

nameDetailController.$inject = ['$scope','nameService','$state','$transitions'];

export const nameDetail = {
  bindings: {
    filenumber: '<',
    search: '<'
  },
  controller: nameDetailController,
  template: require('./nameDetail.component.html')
};

class nameController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;

    this.names = "";

    this.ui = {};
    this.ui.firstName = "";
    this.ui.middileName = "";
    this.ui.lastName = "";
    this.ui.fileNumber = undefined;
  }
}

nameController.$inject = ['$scope','$resource','$state','$transitions'];

export const name = {
  controller: nameController,
  template: `
  <container class="jwa-master-names-grid">
    <container class="jwa-master-names-search" ui-view="search"></container>
    <container class="jwa-master-names-list" ui-view="list"></container>
    <container class="jwa-master-names-detail" ui-view="detail"></container>
  </container>`
};

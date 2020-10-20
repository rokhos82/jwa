class nameController {
  constructor($scope,$resource,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.$resource = $resource;
    this.$scope = $scope;

    this.ui = {};
    this.ui.firstName = "";
    this.ui.middileName = "";
    this.ui.lastName = "";
    this.ui.fileNumber = undefined;

    this.query = {};
    this.searchCount = 1;
  }

  nameSearch(ui) {
    this.query = _.cloneDeep(ui);
    this.query[this.searchCount] = this.searchCount;
    this.searchCount++;
    console.log(`New Search Query`,this.query);
  }
}

nameController.$inject = ['$scope','$resource','$state','$transitions'];

export const name = {
  controller: nameController,
  template: `
  <container class="jwa-master-names-grid">
    <container class="jwa-master-names-search"><name-search on-search="$ctrl.nameSearch(ui)"></name-search></container>
    <container class="jwa-master-names-list"><name-list query="$ctrl.query"></name-list></container>
    <container class="jwa-master-names-detail" ui-view="detail"></container>
  </container>`
};

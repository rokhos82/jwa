class welcomeController {
  constructor($scope,$state,$transitions) {
    this.$scope = $scope;
    this.$state = $state;
    this.$transitions = $transitions;

    this.leadIn = "Welcome to the Justice Web App";
    this.motd = [
      "This application is still in developement and there are bugs.  Please report bugs to your system admin.",
      "Names and Incidents are 80% feature complete.  Next steps include Property and Vehicles."
    ];
  }
}

welcomeController.$inject = ['$scope','$state','$transitions'];

export const welcome = {
  controller: welcomeController,
  template: require('./welcome.component.html')
};

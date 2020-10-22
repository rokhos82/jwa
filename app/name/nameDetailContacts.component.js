function contactController() {}

contactController.$inject = ["$scope"];

export const nameDetailContacts = {
  bindings: {
    contacts: "<"
  },
  controller: contactController,
  template: require("./nameDetailContacts.component.html")
};

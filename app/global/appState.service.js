export function appStateService() {
  let _service = {};

  let _user = {
    authenticated: false
  };

  _service.getUserState = () => {
    return _user;
  };

  return _service;
}

appStateService.$inject = [];

// Service Function Definitions Below

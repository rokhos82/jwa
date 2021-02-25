export function auditService($resource,userService,server,port) {
  let _service = {};

  _service.getEvents = (terms) => {
    let token = userService.getToken();
    let username = userService.getUser();

    let events = $resource(`http://${server}:${port}/api/audit/fetch`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: true
      }
    });

    return events.post({},{terms: terms}).$promise;
  };

  return _service;
}

auditService.$inject = ["$resource","userService","jwa-config-serverIp","jwa-config-serverPort"];

// Service Function Definitions Below

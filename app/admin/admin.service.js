export function adminService($resource,server,port,userService) {
  let _service = {};

  _service.getUserInfo = () => {
    let token = userService.getToken();
    let info = {};

    let users = $resource(`http://${server}:${port}/api/admin/users`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token
        },
        isArray: true
      }
    });

    users.get().then((results) => {
      console.log(results);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log("All is done");
    });
  };

  return _service;
}

adminService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

// Service Function Definitions Below

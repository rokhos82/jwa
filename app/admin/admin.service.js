export function adminService($resource,server,port,userService) {
  let _service = {};

  _service.getUserInfo = () => {
    let token = userService.getToken();

    let users = $resource(`http://${server}:${port}/api/admin/users`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token
        },
        isArray: true
      }
    });

    return users.get().$promise;
  };

  _service.createUser = (firstName,lastName,username,password,roles) => {
    let token = userService.getToken();
    let create = $resource(`http://${server}:${port}/api/auth/signup`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token
        }
      }
    });

    let promise = create.post({},{
      name: {first: firstName, last: lastName},
      username: username,
      password: password,
      roles: roles
    }).$promise;

    promise.catch((err) => {
      console.error(err);
    });

    return promise;
  };

  return _service;
}

adminService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

// Service Function Definitions Below

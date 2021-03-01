export function adminService($resource,server,port,userService) {
  let _service = {};

  _service.getUserInfo = () => {
    let token = userService.getToken();
    let username = userService.getUser();

    let users = $resource(`http://${server}:${port}/api/admin/users`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: true
      }
    });

    return users.get().$promise;
  };

  _service.getRoleInfo = () => {
    let token = userService.getToken();
    let username = userService.getUser();

    let roles = $resource(`http://${server}:${port}/api/admin/roles`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: true
      }
    });

    let promise = roles.get().$promise;

    return promise;
  };

  _service.getAgencyInfo = () => {
    let token = userService.getToken();
    let username = userService.getUser();

    let agencies = $resource(`http://${server}:${port}/api/admin/agencies`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: true
      }
    });

    let promise = agencies.get().$promise;

    return promise;
  };

  _service.getUser = (id) => {
    let token = userService.getToken();
    let username = userService.getUser();

    let user = $resource(`http://${server}:${port}/api/admin/user/:userId`,{},{
      get: {
        method: "GET",
        headers: {
          "x-access-token": token,
          "username": username
        },
        params: {
          userId: encodeURIComponent(id)
        },
        isArray: false
      }
    });

    return user.get().$promise;
  };

  _service.updateUser = (id,firstName,lastName,username,roles) => {
    let token = userService.getToken();

    let update = $resource(`http://${server}:${port}/api/admin/update`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
        }
      }
    });

    let promise = update.post({},{
      _id: id,
      name: {first: firstName, last: lastName},
      username: username,
      roles: roles
    }).$promise;

    promise.catch((err) => {
      console.error(err);
    });

    return promise;
  };

  _service.createUser = (firstName,lastName,username,password,roles) => {
    let token = userService.getToken();

    let create = $resource(`http://${server}:${port}/api/auth/signup`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
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

  _service.resetPassword = (userId,authPassword,newPassword) => {
    let token = userService.getToken();
    let username = userService.getUser();

    let reset = $resource(`http://${server}:${port}/api/admin/password`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
        }
      }
    });

    let promise = reset.post({},{
      "userId": userId,
      "authPassword": authPassword,
      "newPassword": newPassword
    }).$promise;

    return promise;
  };

  return _service;
}

adminService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

// Service Function Definitions Below

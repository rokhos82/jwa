export function userService($resource,server,port) {
  let _service = {};

  const TOKEN_KEY = "auth-token";
  const USER_KEY = "auth-user";

  _service.authenticateUser = (username,password) => {
    let auth = $resource(`http://${server}:${port}/api/auth/signin`,{},{
      post: {
        method: "POST",
        hasBody: true
      }
    });

    let promise = auth.save({},{
      username: username,
      password: password
    }).$promise;

    return promise;
  };

  _service.saveUser = (user) => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,angular.toJson(user));
  };

  _service.getUser = () => {};

  _service.saveToken = () => {};

  _service.getToken = () => {};

  return _service;
}

userService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort"];

// Service Function Definitions Below

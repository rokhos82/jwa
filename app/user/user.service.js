export function userService($resource,server,port) {
  let _service = {};

  const TOKEN_KEY = "auth-token";
  const USER_KEY = "auth-user";

  let _storage = {};

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

    promise.then((response) => {
      _service.saveUser(response.username);
      _service.saveToken(response.accessToken);
    });

    return promise;
  };

  _service.saveUser = (user) => {
    /*window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,angular.toJson(user));//*/
    _storage[USER_KEY] = user;
  };

  _service.getUser = () => {
    return _storage[USER_KEY];
  };

  _service.saveToken = (token) => {
    _storage[TOKEN_KEY] = token;
  };

  _service.getToken = () => {
    return _storage[TOKEN_KEY];
  };

  _service.isAuthenticated = () => {
    return !!_storage[TOKEN_KEY];
  };

  return _service;
}

userService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort"];

// Service Function Definitions Below

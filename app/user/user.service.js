export function userService($resource,server,port,$state,appState) {
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
      appState.getUserState().authenticated = true;
    });

    return promise;
  };

  _service.saveUser = (user) => {
    /*window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,angular.toJson(user));//*/
    _storage[USER_KEY] = user;
    window.sessionStorage.setItem(USER_KEY,user);
  };

  _service.getUser = () => {
    let user = window.sessionStorage.getItem(USER_KEY);
    if(user) {
      return user;
    }
    else {
      return _storage[USER_KEY];
    }
  };

  _service.saveToken = (token) => {
    _storage[TOKEN_KEY] = token;
    window.sessionStorage.setItem(TOKEN_KEY,token);
  };

  _service.getToken = () => {
    return window.sessionStorage.getItem(TOKEN_KEY);
  };

  _service.isAuthenticated = () => {
    return !!window.sessionStorage.getItem(TOKEN_KEY);
  };

  _service.logout = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    appState.getUserState().authenticated = false;
    $state.go("welcome",{},{ reload: true });
  }

  return _service;
}

userService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","$state","jwa-app-state-service"];

// Service Function Definitions Below

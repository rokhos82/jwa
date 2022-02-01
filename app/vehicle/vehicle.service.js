export function vehicleService($resource,server,port,userService,$q) {
  let _service = {};

  let _cache = {};

  _service.getVehicles = (terms) => {
    let token = userService.getToken();
    let username = userService.getUser();

    let list = $resource(`http://${server}:${port}/vehicles/fetch`,{},{
      post: {
        method: "POST",
        headers: {
          "x-access-token": token,
          "username": username
        },
        isArray: false
      }
    });

    let promise = list.post({},{terms: terms}).$promise;

    return promise;
  };

  _service.getVehicleLookups = () => {
    let token = userService.getToken();
    let username = userService.getUser();
    let promise = null;

    // Do we already have the results cached?
    if(_.has(_cache,'lookups')) {
      // Yes
      promise = $q((resolve,reject) => {
        resolve(_cache.lookups);
      });
    }
    else {
      // No
      let lookups = $resource(`http://${server}:${port}/vehicles/lookups`,{},{
        get: {
          method: "GET",
          headers: {
            "x-access-token": token,
            "username": username
          },
          isArray: false
        }
      });

      promise = lookups.get().$promise;

      promise.then((results) => {
        _cache.lookups = results;
      });
    }

    return promise;
  };

  return _service;
}

vehicleService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService","$q"];

// Service Function Definitions Below

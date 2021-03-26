export function nameService($resource,server,port,userService) {
  let _service = {
    getNames: function(terms) {
      let token = userService.getToken();
      let username = userService.getUser();

      let list = $resource(`http://${server}:${port}/names/fetch`,{},{
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
    },
    getNameDetail: (filenumber) => {
      let token = userService.getToken();
      let username = userService.getUser();
      let detail = $resource(`http://${server}:${port}/names/detail/:filenumber`,{},{
        get: {
          method: "GET",
          headers: {
            "x-access-token": token,
            "username": username
          },
          params: {
            filenumber: encodeURIComponent(filenumber)
          },
          isArray: true
        }
      });

      let promise = detail.get().$promise;

      return promise;
    }
  };

  return _service;
}

nameService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

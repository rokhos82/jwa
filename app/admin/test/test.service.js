export function testService($resource,$cookies,server,port,userService) {
  let _service = {
    getTest: function() {
      let token = userService.getToken();
      let username = userService.getUser();

      let test = $resource(`http://${server}:${port}/api/test/all`,{},{
        get: {
          method: "GET",
          headers: {
            "x-access-token": token,
            "username": username
          },
          isArray: false
        }
      });

      console.log(test);

      let promise = test.get().$promise;

      return promise;
    }
  };

  return _service;
}

testService.$inject = ["$resource","$cookies","jwa-config-serverIp","jwa-config-serverPort","userService"];

// Service Function Definitions Below

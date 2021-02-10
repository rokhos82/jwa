export function nameService($resource,server,port,userService) {
  let _service = {
    getNames: function(terms) {
      let list = $resource(`http://${server}:${port}/names/fetch`,{});

      let promise = list.save({},{terms: terms}).$promise;

      return promise;
    },
    getNameDetail: (filenumber) => {
      console.log(`Name Service getNameDateil: ${filenumber}`);
      let detail = $resource(`http://${server}:${port}/names/detail/:filenumber`,{
        filenumber: encodeURIComponent(filenumber)
      });

      let promise = detail.query().$promise;

      // @todo I could add some audit logging here and capture the data returned with a .then()

      return promise;
    }
  };

  return _service;
}

nameService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort","userService"];

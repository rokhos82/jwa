export function nameService($resource,server,port) {
  let _service = {
    /*getNameDetailByFilenumber: function(filenumber) {
      let detail = $resource(`http://${server}:${port}/names/:filenumber`,{
        filenumber: filenumber
      });

      let promise = detail.query().$promise;

      return promise;
    },
    masterNamesSearch: function(terms) {
      let searchApi = $resource('http://localhost:8001/names/search',{});

      console.log(terms);

      let searchPromise = searchApi.save({},terms).$promise;

      return searchPromise;
    },
    masterNamesTop1000: function() {
      let list = $resource('http://localhost:8001/names/list/',{});

      let listPromise = list.save().$promise;

      return listPromise;
    },
    getNameContacts: function(filenumber) {
      let list = $resource('http://localhost:8001/names/contacts',{});

      let listPromise = list.save({},{filenumber:filenumber}).$promise;

      return listPromise;
    },//*/
    getNames: function(terms) {
      let list = $resource(`http://${server}:${port}/names/fetch`,{});

      let promise = list.save({},terms).$promise;

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

nameService.$inject = ["$resource","jwa-config-serverIp","jwa-config-serverPort"];

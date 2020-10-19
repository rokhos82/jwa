export function nameService($resource) {
  let _service = {
    getNameDetailByFilenumber: function(filenumber) {
      let detail = $resource('http://localhost:8001/names/:filenumber',{
        filenumber: filenumber
      })

      let promise = detail.query().$promise;

      return promise;
    },
    masterNamesSearch: function(terms) {
      let searchApi = $resource('http://localhost:8001/names/search',{});

      console.log(this.ui);

      let searchPromise = searchApi.save({},terms).$promise;

      return searchPromise;
    },
    masterNamesTop1000: function() {
      let list = $resource('http://localhost:8001/names/list/',{});

      let listPromise = list.save().$promise;

      return listPromise;
    }
  };

  return _service;
}

nameService.$inject = ["$resource"];

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
      let searchApi = this.$resource('http://localhost:8001/names/search',{});

      console.log(this.ui);

      let searchPromise = searchApi.save({},terms).$promise;

      return searchPromise;
    }
  };

  return _service;
}

nameService.$inject = ["$resource"];

export function nameService($resource) {
  let _service = {
    getNameDetailByFilenumber: function(filenumber) {
      let detail = $resource('http://localhost:8001/names/:filenumber',{
        filenumber: filenumber
      })

      let promise = detail.query().$promise;

      return promise;
    }
  };

  return _service;
}

nameService.$inject = ["$resource"];

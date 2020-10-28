/**
 * The name state.  This is the main state for the jwa-name submodule.
 */

export const nameState = {
  parent: 'app',
  name: 'name',
  url: '/name',
  component: 'name',
  redirectTo: 'nameSearch'
};

export const nameSearchState = {
  parent: 'name',
  name: 'nameSearch',
  url: '/search',
  views: {
    'nameSearch@name':'nameSearch'
  },
  sticky: true
};

export const nameDetailState = {
  parent: 'name',
  name: 'nameDetail',
  url: '/{filenumber}',
  views: {
    'nameDetail@name': 'nameDetail'
  },
  resolve: {
    filenumber: function($stateParams) {
      return $stateParams.filenumber;
    },
    search: function($stateParams) {
      console.log($stateParams);
      return $stateParams.search;
    }
  },
  params: {
    search: null
  },
  data: {}
};

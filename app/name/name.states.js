/**
 * The name state.  This is the main state for the jwa-name submodule.
 */

export const nameState = {
  parent: 'app',
  name: 'name',
  url: '/name',
  component: 'name',
  redirectTo: 'search'
};

export const nameSearchState = {
  parent: 'name',
  name: 'search',
  url: '/search',
  views: {
    'search@name':'nameSearch'
  },
  sticky: true
};

export const nameDetailState = {
  parent: 'name',
  name: 'detail',
  url: '/{filenumber}',
  views: {
    'detail@name': 'nameDetail'
  },
  resolve: {
    filenumber: function($stateParams) {
      return $stateParams.filenumber;
    }
  },
  data: {}
};

/**
 * The name state.  This is the main state for the jwa-name submodule.
 */

export const nameState = {
  parent: 'app',
  name: 'name',
  url: '/name',
  component: 'name',
  resolve: {},
  data: {}
};

export const nameSearchState = {
  parent: 'name',
  name: 'search',
  url: '/name/search',
  component: 'nameSearch',
  resolve: {},
  data: {}
};

export const nameDetailState = {
  parent: 'name',
  name: 'detail',
  url: '/name/detail/{filenumber}',
  component: 'nameDetail',
  resolve: {
    name: function(NameService,$transitions$) {
      return NameService.getNameDetailByFilenumber($transitions$.params().filenumber);
    }
  },
  data: {}
};

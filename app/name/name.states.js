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
  component: 'nameSearch'
  resolve: {},
  data: {}
};

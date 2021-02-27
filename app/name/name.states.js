/**
 * The name state.  This is the main state for the jwa-name submodule.
 */

export const nameState = {
  parent: 'app',
  name: 'name',
  url: '/name',
  component: 'name',
  redirectTo: 'nameSearch',
  data: { requiresAuth: true }
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
    info: NameDetailResolver
  },
  params: {
    search: null
  },
  data: {}
};

NameDetailResolver.$inject = ["$stateParams","nameService"];
function NameDetailResolver($stateParams,nameService) {
  let filenumber = $stateParams.filenumber;
  return nameService.getNameDetail(filenumber);
}

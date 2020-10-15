/**
 * This is the parent state for the entire application
 */



export const appState = {
  name: 'app',
  redirectTo: 'welcome',
  component: 'app'
};

export const welcomeState = {
  parent: 'app',
  name: 'welcome',
  url: '/welcome',
  component: 'welcome'
};

/*export const nameFutureState = {
  parent: 'app',
  name: 'name.**',
  url: '/name',
  lazyLoad: function(transition) {
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return import('../name/name.module.js').then(mod => $ocLazyLoad.load(mod.NAME_MODULE));
  }
};*/

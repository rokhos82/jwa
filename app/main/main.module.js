import {app} from "./app.component.js";

import {appState} from "./app.states.js";

export const MAIN_MODULE = angular.module('jwa-main',["ui.router","ngResource"]);

MAIN_MODULE.config(['$uiRouterProvider',function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  const $urlService = $uiRouter.urlService;
  $urlService.rules.otherwise({state:'app'});

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(appState);
}]);

MAIN_MODULE.component('app',app);

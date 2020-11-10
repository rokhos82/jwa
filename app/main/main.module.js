import {app} from "./app.component.js";
import {welcome} from "./welcome.component.js";

import {appState,welcomeState} from "./app.states.js";

export const MAIN_MODULE = angular.module('jwa-main',["ui.router","ui.bootstrap","ngResource","jwa-name","jwa-incident","jwa-support"]);

MAIN_MODULE.config(['$uiRouterProvider',function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  const $urlService = $uiRouter.urlService;
  $urlService.rules.otherwise({state:'app'});

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(appState);
  $stateRegistry.register(welcomeState);
}]);

MAIN_MODULE.component('app',app);
MAIN_MODULE.component('welcome',welcome);

import {name} from "./name.component.js";

import {nameState,nameSearchState} from "./name.states.js";

export const NAME_MODULE = angular.module("jwa-name",["ui.router","ngResource"]);

NAME_MODULE.config(["$uiRouterProvider",function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(nameState);
  $stateRegistry.register(nameSearchState);
}]);

NAME_MODULE.component('name',name);

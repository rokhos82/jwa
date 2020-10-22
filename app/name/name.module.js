import {name} from "./name.component.js";
import {nameSearch} from "./nameSearch.component.js";
import {nameList} from "./nameList.component.js";
import {nameDetail} from "./nameDetail.component.js";

import {nameService} from "./name.service.js";

import {dateFilter} from "./name.filters.js";

import {nameState,nameDetailState} from "./name.states.js";

export const NAME_MODULE = angular.module("jwa-name",["ui.router","ngResource"]);

NAME_MODULE.config(["$uiRouterProvider",function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(nameState);
  //$stateRegistry.register(nameSearchState);
  $stateRegistry.register(nameDetailState);
}]);

NAME_MODULE.component('name',name);
NAME_MODULE.component('nameSearch',nameSearch);
NAME_MODULE.component('nameDetail',nameDetail);
NAME_MODULE.component('nameList',nameList);

NAME_MODULE.service('nameService',nameService);

NAME_MODULE.filter('dateFilter',dateFilter);

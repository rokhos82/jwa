import {name} from "./name.component.js";
import {nameSearch} from "./nameSearch.component.js";

import {nameDetail} from "./nameDetail.component.js";
import {nameDetailContacts} from "./nameDetailContacts.component.js";
import {nameDetailOtherInfo} from "./nameDetailOtherInfo.component.js";
import {nameDetailWork} from "./nameDetailWork.component.js";
import {nameDetailKin} from "./nameDetailKin.component.js";
import {nameDetailAka} from "./nameDetailAka.component.js";
import {nameDetailIntel} from "./nameDetailIntel.component.js";
import {nameDetailComments} from "./nameDetailComments.component.js";
import {nameDetailAssociates} from "./nameDetailAssociates.component.js";

import {nameList} from "./nameList.component.js";

import {nameService} from "./name.service.js";

import {nameState,nameSearchState,nameDetailState} from "./name.states.js";
import {StickyStatesPlugin} from "@uirouter/sticky-states";

export const NAME_MODULE = angular.module("jwa-name",["ui.router","ngResource","jwa-support"]);

NAME_MODULE.config(["$uiRouterProvider",function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");
  $uiRouter.plugin(StickyStatesPlugin);

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(nameState);
  $stateRegistry.register(nameSearchState);
  $stateRegistry.register(nameDetailState);
}]);

NAME_MODULE.component('name',name);
NAME_MODULE.component('nameSearch',nameSearch);

NAME_MODULE.component('nameDetail',nameDetail);
NAME_MODULE.component('nameDetailContacts',nameDetailContacts);
NAME_MODULE.component('nameDetailOtherInfo',nameDetailOtherInfo);
NAME_MODULE.component('nameDetailKin',nameDetailKin);
NAME_MODULE.component('nameDetailWork',nameDetailWork);
NAME_MODULE.component('nameDetailAka',nameDetailAka);
NAME_MODULE.component('nameDetailIntel',nameDetailIntel);
NAME_MODULE.component('nameDetailComments',nameDetailComments);
NAME_MODULE.component('nameDetailAssociates',nameDetailAssociates);

NAME_MODULE.component('nameList',nameList);

NAME_MODULE.service('nameService',nameService);

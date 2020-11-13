import {incident} from "./incident.component.js";
import {incidentSearch} from "./incidentSearch.component.js";
import {incidentSearchDetail} from "./incidentSearchDetail.component.js";
import {incidentList} from "./incidentList.component.js";
import {incidentDetail} from "./incidentDetail.component.js";

import {incidentState,incidentSearchState,incidentSearchDetailState,incidentDetailState} from "./incident.states.js";

import {incidentService} from "./incident.service.js";

import {StickyStatesPlugin} from "@uirouter/sticky-states";

export const INCIDENT_MODULE = angular.module("jwa-incident",["ui.router","ngResource","jwa-support","jwa-config"]);

INCIDENT_MODULE.config(["$uiRouterProvider",function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");
  $uiRouter.plugin(StickyStatesPlugin);

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(incidentState);
  $stateRegistry.register(incidentSearchState);
  $stateRegistry.register(incidentSearchDetailState);
  $stateRegistry.register(incidentDetailState);
}]);

// Setup components for the incident module
INCIDENT_MODULE.component('incident',incident);
INCIDENT_MODULE.component('incidentSearch',incidentSearch);
INCIDENT_MODULE.component('incidentSearchDetail',incidentSearchDetail);
INCIDENT_MODULE.component('incidentList',incidentList);
INCIDENT_MODULE.component('incidentDetail',incidentDetail);

INCIDENT_MODULE.factory('incidentService',incidentService);

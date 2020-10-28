import {incident} from "./incident.component.js";
import {incidentList} from "./incidentList.component.js";

import {incidentState} from "./incident.states.js";

import {incidentService} from "./incident.service.js";

import {StickyStatesPlugin} from "@uirouter/sticky-states";

export const INCIDENT_MODULE = angular.module("jwa-incident",["ui.router","ngResource"]);

INCIDENT_MODULE.config(["$uiRouterProvider",function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");
  $uiRouter.plugin(StickyStatesPlugin);

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(incidentState);
}]);

// Setup components for the incident module
INCIDENT_MODULE.component('incident',incident);
INCIDENT_MODULE.component('incidentList',incidentList);

INCIDENT_MODULE.factory('incidentService',incidentService);

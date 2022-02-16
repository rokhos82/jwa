/**
 * @namespace VEHICLE_MODULE
 * @memberOf angular_module
 */

import {vehicleRoot} from "./vehicleRoot.component.js";
import {vehicleSearch} from "./vehicleSearch.component.js";
import {vehicleList} from "./vehicleList.component.js";
import {vehicleDetail} from "./vehicleDetail.component.js";

import {vehicleState,vehicleSearchState,vehicleDetailState} from "./vehicle.states.js";

import {vehicleService} from "./vehicle.service.js";

import {StickyStatesPlugin} from "@uirouter/sticky-states";

export const VEHICLE_MODULE = angular.module("jwa-vehicle",["ui.router","ngResource","jwa-support","jwa-config"]);

VEHICLE_MODULE.config(["$uiRouterProvider",moduleController]);

function moduleController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");
  $uiRouter.plugin(StickyStatesPlugin);

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(vehicleState);
  $stateRegistry.register(vehicleSearchState);
  $stateRegistry.register(vehicleDetailState);
}

VEHICLE_MODULE.component('vehicleRoot',vehicleRoot);
VEHICLE_MODULE.component('vehicleSearch',vehicleSearch);
VEHICLE_MODULE.component('vehicleList',vehicleList);
VEHICLE_MODULE.component('vehicleDetail',vehicleDetail);

VEHICLE_MODULE.factory('vehicleService',vehicleService);

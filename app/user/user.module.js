/**
 * @namespace USER_MODULE
 * @memberOf angular_module
 */

import {userService} from "./user.service.js";

export const USER_MODULE = angular.module("jwa-user",["ui.router","ngResource","jwa-support","jwa-config","jwa-audit"]);

USER_MODULE.config(["$uiRouterProvider",userController]);

function userController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
}

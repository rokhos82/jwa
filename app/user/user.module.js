/**
 * @namespace USER_MODULE
 * @memberOf angular_module
 */

import {userLogin} from "./userLogin.component.js";
import {userLogout} from "./userLogout.component.js";

import {userService} from "./user.service.js";

import {userLoginState,userLogoutState} from "./user.states.js";

export const USER_MODULE = angular.module("jwa-user",["ui.router","ngResource","jwa-support","jwa-config"]);

USER_MODULE.config(["$uiRouterProvider",userController]);

function userController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(userLoginState);
  $stateRegistry.register(userLogoutState);
}

USER_MODULE.component("userLogin",userLogin);
USER_MODULE.component("userLogout",userLogout);

USER_MODULE.factory("userService",userService);

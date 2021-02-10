/**
 * @namespace USER_MODULE
 * @memberOf angular_module
 */

import {userTest} from "./userTest.component.js";
import {userLogin} from "./userLogin.component.js";

import {userService} from "./user.service.js";

import {userTestState,userLoginState} from "./user.states.js";

export const USER_MODULE = angular.module("jwa-user",["ui.router","ngResource","jwa-support","jwa-config","jwa-audit"]);

USER_MODULE.config(["$uiRouterProvider",userController]);

function userController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(userTestState);
  $stateRegistry.register(userLoginState);
}

USER_MODULE.component("userTest",userTest);
USER_MODULE.component("userLogin",userLogin);

USER_MODULE.factory("userService",userService);

/**
 * @namespace ADMIN_MODULE
 * @memberOf angular_module
 */
import {adminRoot} from "./adminRoot.component.js";
import {adminUsers} from "./users/adminUsers.component.js";
import {adminUsersList} from "./users/adminUsersList.component.js";
import {adminUsersCreate} from "./users/adminUsersCreate.component.js";

import {adminRootState,adminUsersState,adminUsersListState,adminUsersCreateState} from "./admin.states.js";

export const ADMIN_MODULE = angular.module("jwa-admin",["ui.router","ngResource","jwa-support","jwa-config"]);

ADMIN_MODULE.config(["$uiRouterProvider",adminController]);

function adminController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(adminRootState);
  $stateRegistry.register(adminUsersState);
  $stateRegistry.register(adminUsersListState);
  $stateRegistry.register(adminUsersCreateState);
}

ADMIN_MODULE.component("adminRoot",adminRoot);
ADMIN_MODULE.component("adminUsers",adminUsers);
ADMIN_MODULE.component("adminUsersList",adminUsersList);
ADMIN_MODULE.component("adminUsersCreate",adminUsersCreate);

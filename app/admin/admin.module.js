/**
 * @namespace ADMIN_MODULE
 * @memberOf angular_module
 */
import {adminRoot} from "./adminRoot.component.js";
import {adminUsers} from "./users/adminUsers.component.js";
import {adminUsersList} from "./users/adminUsersList.component.js";
import {adminUsersCreate} from "./users/adminUsersCreate.component.js";
import {adminUsersEdit} from "./users/adminUsersEdit.component.js";

import {testComponent} from "./test/test.component.js";
import {testService} from "./test/test.service.js";

import {auditList} from "./audit/auditList.component.js";

import {passwordReset} from "./password/passwordReset.component.js";

import {adminService} from "./admin.service.js";
import {auditService} from "./audit/audit.service.js";

import {adminRootState,adminUsersState,adminUsersListState,adminUsersCreateState,adminUsersEditState,auditListState,testState} from "./admin.states.js";

export const ADMIN_MODULE = angular.module("jwa-admin",["ui.router","ngResource","ngCookies","jwa-support","jwa-config","jwa-user"]);

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
  $stateRegistry.register(adminUsersEditState);

  $stateRegistry.register(auditListState);

  $stateRegistry.register(testState);
}

ADMIN_MODULE.component("adminRoot",adminRoot);
ADMIN_MODULE.component("adminUsers",adminUsers);
ADMIN_MODULE.component("adminUsersList",adminUsersList);
ADMIN_MODULE.component("adminUsersCreate",adminUsersCreate);
ADMIN_MODULE.component("adminUsersEdit",adminUsersEdit);

ADMIN_MODULE.component("auditList",auditList);

ADMIN_MODULE.component("passwordReset",passwordReset);

ADMIN_MODULE.factory("adminService",adminService);
ADMIN_MODULE.factory("auditService",auditService);

ADMIN_MODULE.component("testComponent",testComponent);
ADMIN_MODULE.factory("testService",testService);

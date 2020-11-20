/**
 * @namespace AUDIT_MODULE
 * @memberOf angular_module
 */

import {auditService} from "./audit.service.js";
import {auditHookRunBlock} from "./audit.hook.js";

export const AUDIT_MODULE = angular.module("jwa-audit",["ui.router","ngResource","jwa-support","jwa-config","jwa-user"]);

AUDIT_MODULE.config(["$uiRouterProvider",auditModuleController]);

function auditModuleController($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");

  // Setup the states that the Incident module will use
  const $stateRegistry = $uiRouter.stateRegistry;
}

AUDIT_MODULE.factory("auditService",auditService);

AUDIT_MODULE.run(auditHookRunBlock);

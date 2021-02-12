/**
 * @class angular_module.SUPPORT_MODULE
 * @memberOf angular_module
 */
import {appStateService} from "./appState.service.js";

import {dateFilter} from "./date.filter.js";
import {timeFilter} from "./time.filter.js";

import {authRedirectRunBlock} from "./authRedirect.hook.js";

export const SUPPORT_MODULE = angular.module("jwa-support",[]);

SUPPORT_MODULE.factory("jwa-app-state-service",appStateService);

SUPPORT_MODULE.filter("jwaDate",dateFilter);
SUPPORT_MODULE.filter("time",timeFilter);

SUPPORT_MODULE.run(authRedirectRunBlock);

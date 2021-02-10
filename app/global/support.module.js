/**
 * @class angular_module.SUPPORT_MODULE
 * @memberOf angular_module
 */
import {dateFilter} from './date.filter.js';
import {timeFilter} from './time.filter.js';

import {authRedirectRunBlock} from "./authRedirect.hook.js";

export const SUPPORT_MODULE = angular.module('jwa-support',[]);

SUPPORT_MODULE.filter('date',dateFilter);
SUPPORT_MODULE.filter('time',timeFilter);

SUPPORT_MODULE.run(authRedirectRunBlock);

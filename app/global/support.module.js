/**
 * @class angular_module.SUPPORT_MODULE
 * @memberOf angular_module
 */
import {dateFilter,timeFilter} from './support.filters.js';

export const SUPPORT_MODULE = angular.module('jwa-support',[]);

SUPPORT_MODULE.filter('date',dateFilter);
SUPPORT_MODULE.filter('time',timeFilter);

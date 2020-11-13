/**
 * @class angular_module.CONFIG_MODULE
 * @memberOf angular_module
 * @desc This module holds configuration items for the application.  For example, remote hosts and ports
 */

export const CONFIG_MODULE = angular.module('jwa-config',[]);

CONFIG_MODULE.constant('jwa-config-serverIp',SERVER_IP);
CONFIG_MODULE.constant('jwa-config-serverPort',SERVER_PORT);

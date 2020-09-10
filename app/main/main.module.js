export const MAIN_MODULE = angular.module('jwa_main',[]);

MAIN_MODULE.config(['$uiRouterProvider',function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  $uiRouter.trace.enable("TRANSITION");
}]);

/**
 * This run block registers a Transition Hook which protects
 * routes that requires authentication.
 */

authRedirectRunBlock.$inject = ["$transitions","userService"];
export function authRedirectRunBlock($transitions,userService) {
  // Matches if the destination states's data property
  // has a truthy 'requiresAuth' property
  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresAuth
  };

  let redirectToLogin = (transition) => {
    let userService = transition.injector().get("userService");
    let $state = transition.router.stateService;
    if(!userService.isAuthenticated()) {
      return $state.target("userLogin",undefined,{ location: false });
    }
  };

  // Register the hook
  $transitions.onBefore(requiresAuthCriteria,redirectToLogin,{ priority: 10 });
}

export const userTestState = {
  parent: "app",
  name: "userTestRoot",
  url: "/test",
  component: "userTest",
};

export const userLoginState = {
  parent: "app",
  name: "userLogin",
  url: "/login",
  component: "userLogin",
  resolve: {
    returnTo: returnToResolver
  }
};

/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "home" state.
 */
returnToResolver.$inject = ["$transition$"];
function returnToResolver($transition$) {
  if($transition$.redirectedFrom() != null) {
    // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
    // Return to the original attempted target state (e.g., contacts)
    return $transition$.redirectedFrom().targetState();
  }

  let $state = $transition$.router.stateService;

  // The user was not redirected to the login state; they directly activated the login state somehow.
  // Return them to the state they came from.
  if($transition$.from().name !== "") {
    return $state.target($transition$.from(),$transition$.params("from"));
  }

  // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
  return $state.target("welcome");
}

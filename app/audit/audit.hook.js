/**
 * @todo Add check for resolve and get the information to log
 * @todo Move audit logging to each state as each state has unique resolvers
 */
export function auditHookRunBlock($transitions,auditService) {
  let stateTransitionAudit = (transition) => {
    let toState = transition.to();

    let stateName = toState.name || "";
    let resolved = toState.resolve || undefined;
    let datetime = new Date(Date.now()).toISOString();
    console.log(datetime,stateName,resolved);
    auditService.log(`${stateName}`);
  };

  $transitions.onSuccess({},stateTransitionAudit);
}

auditHookRunBlock.$inject = ["$transitions","auditService"];

export const adminRootState = {
  parent: "app",
  name: "adminRoot",
  url: "/admin",
  component: "adminRoot",
  redirectTo: "adminUsers",
  data: { requiresAuth: true }
};

export const adminUsersState = {
  parent: "adminRoot",
  name: "adminUsers",
  url: "/users",
  component: "adminUsers",
  redirectTo: "adminUsersList"
};

export const adminUsersListState = {
  parent: "adminUsers",
  name: "adminUsersList",
  url: "/list",
  component: "adminUsersList"
};

export const adminUsersCreateState = {
  parent: "adminUsers",
  name: "adminUsersCreate",
  url: "/new",
  component: "adminUsersCreate"
};

export const adminUsersEditState = {
  parent: "adminUsers",
  name: "adminUsersEdit",
  url: "/edit/:userId",
  component: "adminUsersEdit",
  resolve: {
    user: userResolver
  }
};

userResolver.$inject = ["$stateParams","adminService"];
function userResolver($stateParams,adminService) {
  return adminService.getUser($stateParams.userId);
}

export const auditListState = {
  parent: "adminRoot",
  name: "auditList",
  url: "/audit",
  component: "auditList",
  resolve: {
    events: eventsResolver
  }
};

eventsResolver.$inject = ["auditService"];
function eventsResolver(auditService) {
  return auditService.getEvents().then((events) => {
    return events;
  });
}

export const testState = {
  parent: "adminRoot",
  name: "test",
  url: "/test",
  component: "testComponent"
};

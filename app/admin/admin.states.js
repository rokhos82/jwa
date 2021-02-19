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
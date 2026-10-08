export const HasRole = (roles, targetedRole) => {
  for (const role of roles) {
    if (role.roleName === targetedRole) {
      return true;
    }
  }

  return false;
};

export const HasPageAccess = (roles, pageAccessName) => {
  for (const role of roles) {
    for (const { pageName } of role.pageAccess) {
      if (pageName === pageAccessName) {
        return true;
      }
    }
  }

  return false;
};

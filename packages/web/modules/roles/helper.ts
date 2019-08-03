export const getRoleKey = (name: string): string => {
  // make key of the role name.
  let roleKey = name.toLowerCase();
  const arrRoleKeyVal = roleKey.match(/\S+/g);

  if (arrRoleKeyVal && arrRoleKeyVal.length > 1) {
    roleKey = arrRoleKeyVal.join("_");
  }

  return roleKey;
};

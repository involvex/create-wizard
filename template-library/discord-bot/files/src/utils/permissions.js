module.exports = {
  hasPermission: (member, permission) => {
    return member.permissions.has(permission);
  },
};

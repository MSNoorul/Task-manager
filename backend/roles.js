const roles = {
  admin: ['admin', 'user', 'manager'], // Admin has all roles
  user: ['user'], // Regular user role
  manager: ['manager'], // Manager role
  guest: [], // Guest has no roles
};

module.exports = roles ;

const roles = {
  admin: ['admin'], // Admin has all roles
  user: ['user','manger','admin'], // Regular user role
  manager: ['manager','admin'], // Manager role
  guest: [], // Guest has no roles
};

module.exports = roles ;

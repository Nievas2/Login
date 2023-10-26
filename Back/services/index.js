const {
  createUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  patchUser,
  patchAdmins,
  deleteAdmins,
} = require("./userService");

const UserService = {
  createUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  patchUser,
  patchAdmins,
  deleteAdmins,
};


module.exports = {
  UserService,
};

const {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  patchAdmins,
  deleteAdmins,
} = require("./userController");

const UserController = {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  patchAdmins,
  deleteAdmins,
};

module.exports = {
  UserController,
};

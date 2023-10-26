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
} = require("./userProvider");
const UserProvider = {
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
  UserProvider,
};

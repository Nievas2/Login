const bcrypt = require('bcrypt');
const { User} = require('../models');

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUserByEmail = async (option) => {
  try {
    const user = await User.findOne({
      where: { email: option },
    });
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const getUsers = async () => {
  try {
    const options = {
      attributes: { exclude: ['password'] },
    };
    const users = await User.findAll(options);
    return users;
  } catch (error) {
    throw ('Error:', error);
  }
};

const updateUser = async (userId, userOptions) => {
  try {
    await getUserById(userId);
    await User.update(userOptions, { where: { id: userId } });
    return getUserById(userId);
  } catch (error) {
    throw ('Error:', error);
  }
};
const patchUser = async (userId, newPassword) => {
  try {
    const user = await User.findByPk(userId);
    user.password = newPassword.password;
    await user.save();
    return getUserById(userId);
  } catch (error) {
    throw ('Error:', error);
  }
};
const patchAdmins = async (userId) => {
  try {
    const user = await User.findByPk(userId.userId);
    user.admin = true;
    await user.save();
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const deleteAdmins = async (userId) => {
  try {
    const user = await User.findByPk(userId.userId);
    user.admin = false;
    await user.save();
    return user;
  } catch (error) {
    throw ('Error:', error);
  }
};
const deleteUser = async (userId) => {
  try {
    return await User.update(
      { active: false },
      { where: { id: userId, active: true } },
    );
  } catch (error) {
    throw ('Error:', error);
  }
};
const validateUser = async (emailSelect, password) => {
  const userData = await User.findOne({
    where: { email: emailSelect },
  });
  if (userData == null || userData == undefined) { return null; }
  const hashedPassword = userData.password;
  if(hashedPassword == null || hashedPassword == undefined){ return null; }
  const match = await bcrypt.compare(password, hashedPassword);
  if (match) {
    try {
      const user = await User.findOne({
        where: { email: emailSelect},
      });
      if (user) {
        return user;
      }
      return false;
    } catch (error) {
      throw ('Error:', error);
    }
  } else {
    return false;
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  patchUser,
  validateUser,
  patchAdmins,
  deleteAdmins,
};

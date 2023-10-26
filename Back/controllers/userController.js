const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { UserService } = require('../services');

const saltRounds = 10;

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({
      errors: result.array(),
    });
  }
  const {
    firstName, lastName, email, phone, password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await UserService.createUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({
      errors: result.array(),
    });
  }
  const { userId } = req.params;
  const {
    firstName, lastName, phone, password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    // le agrego el dates porque me da error el eslint por la liña 57
    const updateUserDates = await UserService.updateUser(userId, {
      firstName,
      lastName,
      phone,
      password: hashedPassword,
    });
    return res.status(200).json(updateUserDates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updatePassword = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({
      errors: result.array(),
    });
  }
  const { userId } = req.params;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const updatePasswordDate = await UserService.patchUser(userId, {
      password: hashedPassword,
    });
    return res.status(200).json(updatePasswordDate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserService.deleteUser(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const patchAdmins = async (req, res) => {
  const userId = req.body;
  try {
    const admins = await UserService.patchAdmins(userId);
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteAdmins = async (req, res) => {
  const userId = req.params;
  try {
    const admins = await UserService.deleteAdmins(userId);
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// exports
module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  updatePassword,
  getUserByEmail,
  patchAdmins,
  deleteAdmins,
};

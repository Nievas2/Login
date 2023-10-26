const express = require('express');
const { body } = require('express-validator');
const { UserController } = require('../controllers');

const router = express.Router();
router.get('/:userId', UserController.getUserById);

router.delete('/admin/:userId', /* authMW, adminCheck, */ UserController.deleteAdmins);
router.get('/', /* authMW, adminCheck, */ UserController.getUsers);
router.get('/email/:email', UserController.getUserByEmail);
router.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  body('password').isString(),
  UserController.createUser,
);
router.patch(
  '/admins',
  body('userId').isInt(),
  /* authMW, adminCheck, */
  UserController.patchAdmins,
);


router.put(
  '/:userId',
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  body('phone').isString(),
  body('password').isString(),
  UserController.updateUser,
);

router.patch(
  '/:userId',
  body('password').isString(),
  UserController.updatePassword,
);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;

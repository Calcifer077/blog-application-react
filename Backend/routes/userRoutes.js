const expres = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = expres.Router();

router.use('/login', authController.login);
router.use('/signup', authController.signUp);
router.use('/logout', authController.logout);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// router.use(authController.protect);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

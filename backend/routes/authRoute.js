import express from 'express';
import * as authController from '../controller/authcontroller.js';
import {protectRoute} from '../Middleware/authmiddleware.js'

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/onboarding',protectRoute, authController.onboard);
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router;

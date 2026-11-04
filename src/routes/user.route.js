import express from 'express'
import * as userController from '../controllers/user.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'

const router = express.Router();
router.get('/me',requireAuth, userController.getMyProfile)
router.patch('/me',requireAuth, userController.updateMyProfile)
export default router
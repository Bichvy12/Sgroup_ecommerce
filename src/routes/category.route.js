import express from "express"
import * as categoryController from "../controllers/category.controller.js"
import { requireAuth } from "../middlewares/auth.middleware.js"
import { requireRole } from "../middlewares/authorize.middleware.js"
const router=express.Router()
router.get('/',categoryController.getAllCategories)
router.get('/:id',categoryController.getCategoryById)
router.post('/',requireAuth,requireRole(['admin']),categoryController.createCategory)
router.delete('/:id',requireAuth,requireRole(['admin']),categoryController.deleteCategory)
export default router
import express from 'express'
import * as orderController from '../controllers/order.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'
import { requireRole } from '../middlewares/authorize.middleware.js'

const router=express.Router()
router.post('/',requireAuth,requireRole(['user']),orderController.createOrder)
router.get('/',requireAuth,requireRole(['user']),orderController.getMyOrders)
router.get('/:id',requireAuth,requireRole(['user']),orderController.getMyOrderById)
router.get('/admin/all',requireAuth,requireRole(['admin']),orderController.getAllOrders)
router.get('/admin/:id',requireAuth,requireRole(['admin']),orderController.getOrderById)
router.patch('/admin/:id/status',requireAuth,requireRole(['admin']),orderController.updateOrderStatus)
export default router

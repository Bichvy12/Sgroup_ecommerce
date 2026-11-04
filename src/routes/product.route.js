import express from 'express';
import * as productController from '../controllers/product.controller.js'
import { requireAuth } from '../middlewares/auth.middleware.js'; 
import { requireRole } from '../middlewares/authorize.middleware.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/admin/all', requireAuth,requireRole(['admin']),productController.adminGetAllProducts);
router.post('/', requireAuth,requireRole(['admin']),productController.createProduct);
router.patch('/:id', requireAuth,requireRole(['admin']),productController.updateProduct);
router.delete('/:id', requireAuth,requireRole(['admin']),productController.deleteProduct);
export default router;
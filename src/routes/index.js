import express from 'express'
import userRouter from './user.route.js'
import productRouter from './product.route.js'
import authRouter from './auth.route.js'
import orderRouter from './order.route.js'
import categoryRouter from './category.route.js'
const rootRouter = express.Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/orders', orderRouter)
rootRouter.use('/categories', categoryRouter)
export default rootRouter;
 
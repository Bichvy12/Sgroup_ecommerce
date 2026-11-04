import * as orderService from '../services/order.service.js'
export const createOrder = async (req, res, next) => {
    try {
        const newOrder = await orderService.createNewOrder(req.user.id, req.body)
        return res.status(201).json({
            success: true,
            message: 'Tao don hang thanh cong',
            data: newOrder
        })
    } catch (error) {
        next(error)
    }
}
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id)
        return res.status(200).json({
            success: true,
            message: 'Don hang cua toi',
            data: orders
        })
    } catch (error) {
        next(error)
    }
}
export const getMyOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getMyOrderById(req.user.id, req.params.id)
        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error)
    }
}
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders()
        return res.status(200).json({
            success: true,
            message: 'Danh sach tat ca cac don hang',
            data: orders
        })

    } catch (error) {
        next(error)
    }
}
export const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id)
        return res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        next(error)
    }
}
export const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status)
        return res.status(200).json({
            success: true,
            message:'Cap nhat trang thai don hang thanh cong',
            data: order
        })
    } catch (error) {
        next(error)
    }
}
import { getAllOrderFromDB, getOrderByIdFromDB, getOrdersByUserIdFromDB, getOrderItemsFromDB, createOrderInDB, updateOrderStatusInDB } from "../repositories/order.repository.js";
import { createError } from "../utils/error.util.js"
import { formatOrder, formatOrderDetail } from "../utils/order.util.js"
import { validateCreateOrder, validateOrderId } from "../validators/order.validator.js"
export const getOrderWithItems = async (order) => {
    const items = await getOrderItemsFromDB(order.id)
    return formatOrderDetail({ ...order, items })
}
export const createNewOrder = async (userId, data) => {
    validateCreateOrder(data)
    const orderId = await createOrderInDB(userId, {
        items: data.items,
        shipping_address: data.shipping_address.trim(),
        receiver_phone: data.receiver_phone.trim(),
        note: data.note?.trim() || null
    })
    const order = await getOrderByIdFromDB(orderId)
    return await getOrderWithItems(order)
}
export const getMyOrders = async (userId) => {
    const orders = await getOrdersByUserIdFromDB(userId)
    return orders.map(formatOrder)
}
export const getMyOrderById = async (userId, id) => {
    const orderId = Number(id)
    validateOrderId(orderId)
    const order = await getOrderByIdFromDB(orderId)
    if (!order || Number(order.user_id) !== Number(userId)) {
        throw createError('Khong tim thay don hang', 404)
    }
    return await getOrderWithItems(order)
}
export const getAllOrders = async () => {
    const orders = await getAllOrderFromDB()
    return orders.map(formatOrder)
}
export const getOrderById = async (id) => {
    const orderId = Number(id)
    validateOrderId(orderId)
    const order = await getOrderByIdFromDB(orderId)
    if (!order) {
        throw createError('Khong tim thay don hang', 404)
    }
    return await getOrderWithItems(order)
}
export const updateOrderStatus = async (id, newStatus) => {
    const orderId = Number(id)
    validateOrderId(orderId)
    const order = await getOrderByIdFromDB(orderId)
    if (!order) {
        throw createError('Khong tim thay don hang', 404)
    }
    const allowedTransitions = {
        PENDING: ['SHIPPING', 'CANCELLED'],
        SHIPPING: ['DELIVERED'],
        DELIVERED: [],
        CANCELLED: []
    }
    if (typeof newStatus !== 'string' || !allowedTransitions[order.status]?.includes(newStatus)) {
        throw createError('Chuyen trang thai khong hop le', 400)
    }
    const updatedOrder = await updateOrderStatusInDB(orderId, newStatus)
    return getOrderWithItems(updatedOrder)
}
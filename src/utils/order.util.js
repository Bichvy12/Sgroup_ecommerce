export const formatOrderDetail=(order)=>({
    id:order.id,
    customer:{
        fullName:order.customer_name,
        phone:order.customer_phone
    },
    totalAmount:Number(order.total_amount),
    shippingAddress:order.shipping_address,
    receiverPhone:order.receiver_phone,
    note:order.note,
    status:order.status,
    createdAt:order.created_at,
    items:(order.items??[]).map(item=>({
        productId:item.product_id,
        productName:item.product_name,
        quantity:item.quantity,
        unitPrice:Number(item.unit_price),
        subTotal:Number(item.unit_price)*item.quantity
    }))
})
export const formatOrder=(order)=>({
    id:order.id,
    totalAmount:Number(order.total_amount),
    status:order.status,
    createdAt:order.created_at
})
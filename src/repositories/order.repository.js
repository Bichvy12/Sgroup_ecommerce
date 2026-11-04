import pool from '../configs/db.config.js'
import {createError} from '../utils/error.util.js'
export const getAllOrderFromDB=async()=>{
    const [rows]=await pool.query(`
        SELECT *
        FROM orders
        ORDER BY created_at DESC`)
    return rows
}
export const getOrdersByUserIdFromDB=async(userId)=>{
    const [rows]=await pool.query(`
        SELECT *
        FROM orders
        WHERE user_id=?
        ORDER BY created_at DESC`,[userId])
    return rows
}
export const getOrderByIdFromDB = async (id) => {
  const [rows] = await pool.query(`
    SELECT
      o.id,
      o.user_id,
      o.total_amount,
      o.shipping_address,
      o.receiver_phone,
      o.note,
      o.status,
      o.created_at,
      u.full_name AS customer_name,
      u.phone AS customer_phone
    FROM orders o
    JOIN users u ON u.id = o.user_id
    WHERE o.id = ?
  `, [id])
  return rows[0] ?? null
}
export const getOrderItemsFromDB=async(orderId)=>{
    const [rows]=await pool.query(`
        SELECT
         oi.id,
         oi.order_id,
         oi.product_id,
         p.name as product_name,
         oi.quantity,
         oi.unit_price
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id=p.id
        WHERE oi.order_id=?`,[orderId])
        return rows
}
export const createOrderInDB=async(userId,data)=>{
    const connection=await pool.getConnection()
    try{
        await connection.beginTransaction()
        const {items,shipping_address,receiver_phone,note}=data
        let totalAmount=0
        const orderItems=[]
        const sortedItem=[...items].sort((a,b)=>a.product_id-b.product_id)
        for(const item of sortedItem){
            const [rows]=await connection.query(`
                SELECT id,price,stock,is_active
                FROM products
                WHERE id=?
                FOR UPDATE `,[item.product_id])
            const product=rows[0]
            if(!product||!product.is_active){
                throw createError(`San pham ${item.product_id} khong ton tai hoac ngung ban`,404)
            }
            if(product.stock<item.quantity){
                throw createError(`San pham ${item.product_id} khong du ton kho`,400)
            }
            const price=Number(product.price)
            totalAmount+=price*item.quantity
            orderItems.push({
                product_id:product.id,
                quantity:item.quantity,
                unit_price:price
            })
        }
        const [orderResult]=await connection.query(`
            INSERT INTO orders (user_id,total_amount,shipping_address,receiver_phone,note,status)
            VALUES (?,?,?,?,?,'PENDING')`,
            [userId,totalAmount,shipping_address,receiver_phone,note??null])
        const orderId=orderResult.insertId
        for(const item of orderItems){
            await connection.query(`
                INSERT INTO order_items (order_id,product_id,quantity,unit_price)
                VALUES(?,?,?,?)`,[orderId,item.product_id,item.quantity,item.unit_price])
            await connection.query(`
                UPDATE products
                SET stock=stock-?
                WHERE id=?`,[item.quantity,item.product_id])
        }
        await connection.commit()
        return orderId
    }catch(error){
        await connection.rollback()
        throw error
    }finally{
        connection.release()
    }
}
export const updateOrderStatusInDB=async(id,status)=>{
    await pool.query(`
        UPDATE orders
        SET status=?
        WHERE id=?
        `,[status,id])
    return await getOrderByIdFromDB(id)
}
import pool from "../configs/db.config.js"
export const getAllCategoryInDB=async()=>{
    const [rows]=await pool.query(`
        SELECT *
        FROM categories
        ORDER BY id ASC`)
    return rows
}
export const getCategoryByIdFromDB=async(id)=>{
    const [rows]=await pool.query(`
        SELECT *
        FROM categories
        WHERE id=?`,[id])
    return rows[0]||null
}
export const createCategoryInDB=async(name)=>{
    const [result]=await pool.query(`
        INSERT INTO categories (name)
        VALUE (?)`,[name])
    return result.insertId
}
export const deleteCategoryFromDB=async(id)=>{
    await pool.query(`
        DELETE FROM categories
        WHERE id=?`,[id])
}
export const countProductsByCategoryFromDB=async(id)=>{
    const [rows]=await pool.query(`
        SELECT COUNT(*) AS total
        FROM products
        WHERE category_id=?`,[id])
    return Number(rows[0].total)
}
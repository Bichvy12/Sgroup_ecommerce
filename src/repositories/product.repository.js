import pool from "../configs/db.config.js"
export const getProductsFromDB = async (includeInactive = false) => {
  let sql = `
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.stock,
        p.is_active,
        c.name as category_name,
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      `
  if (!includeInactive) {
    sql += `WHERE p.is_active = 1`
  }
  sql += ` ORDER BY p.id ASC`

  const [rows] = await pool.query(sql)
  return rows
}
export const getProductByIdFromDB = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.stock,
      p.is_active,
      p.category_id,
      c.name as category_name,
      p.created_at,
      p.updated_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `, [id])
  return rows[0] ?? null
}
export const createProductInDB = async (name, description, price, stock, category_id, is_active) => {
  const [rows] = await pool.query(`
    INSERT INTO products (name, description, price, stock, category_id, is_active) VALUES
    (?, ?, ?, ?, ?, ?)
  `, [name, description, price, stock, category_id, is_active])
  return await getProductByIdFromDB(rows.insertId)
}
export const updateProductInDB = async (id, name, description, price, stock, category_id, is_active) => {
  await pool.query(`
    UPDATE products
    SET name=?,description=?,price=?,stock=?,category_id=?,is_active=?
    WHERE id=?`, [name, description, price, stock, category_id, is_active, id])
  return await getProductByIdFromDB(id)
}
export const deleteProductInDB = async (id) => {
  const [rows] = await pool.query(`
    UPDATE products
    SET is_active=0
    WHERE id=?`, [id])
  return rows
}

import pool from "../configs/db.config.js";
export const getAllUsersFromDB = async () => {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users
        ORDER BY id ASC`)
    return rows
}
export const getUserByIdFromDB = async (id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE id=?`, [id])
    return rows[0] ?? null
}
export const getUserByEmailFromDB = async (email) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE email=?`, [email])
    return rows[0] ?? null
}
export const createUserInDB = async ({ fullName, email, password_hash, phone, role }) => {
    const [rows] = await pool.query(`
        INSERT INTO users (full_name, email, password_hash, phone, role)
        VALUES (?, ?, ?, ?, ?)`, [fullName, email, password_hash, phone, role])
    return await getUserByIdFromDB(rows.insertId)
}
export const saveRefreshTokenFromDB = async (userId, refreshToken) => {
    await pool.query(`
        INSERT INTO refresh_tokens (user_id,token)
        VALUE (?,?)
        ON DUPLICATE KEY UPDATE token=?
        `, [userId, refreshToken, refreshToken])
}
export const getRefreshTokenFromDB = async (refreshToken) => {
    const [rows] = await pool.query(`
        SELECT * FROM refresh_tokens WHERE token=?`, [refreshToken])
    return rows[0] ?? null
}
export const removeRefreshTokenFromDB = async (refreshToken) => {
    await pool.query(`
        DELETE FROM refresh_tokens WHERE token=?`, [refreshToken])
}
export const updateUserProfileInDB =async(id,fullName,phone)=>{
    await pool.query(`
        UPDATE users
        SET full_name=?,phone=?
        WHERE id=?`,[fullName,phone,id])
    return await getUserByIdFromDB(id)
}
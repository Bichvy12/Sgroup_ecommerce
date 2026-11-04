import jwt from 'jsonwebtoken'
import { getUserByIdFromDB } from '../repositories/user.repository.js'
const accessToken = process.env.ACCESS_TOKEN_SECRET
export const requireAuth = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Truy cap bi tu choi: Token khong hop le hoac bi thieu"
        })
    }
    try {
        const payload = jwt.verify(token, accessToken)
        const user = await getUserByIdFromDB(payload.id)
        if (!user || !user.is_active) {
            return res.status(403).json({
                success: false,
                message: 'Tai khoan khong ton tai hoac da bi khoa'
            })
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        next()
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Token ko hop le"
        })
    }
}
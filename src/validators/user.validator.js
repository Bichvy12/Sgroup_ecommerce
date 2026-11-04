import { createError } from "../utils/error.util.js"
export const validateRegister = ({ fullName, email, password, phone }) => {
    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
        throw createError('Ho ten khong hop le', 400)
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        throw createError('Email khong hop le', 400)
    }
    if (typeof password !== 'string' || password.length < 8) {
        throw createError('Mat khau it nhat 8 ki tu', 400)
    }
    if (typeof phone !== 'string' || !/^0\d{9}$/.test(phone.trim())) {
        throw createError('SĐT khong hop le', 400)
    }
}
export const validateLogin = ({ email, password }) => {
    if (typeof email !== 'string' || !email.trim()) {
        throw createError('Email khong duoc de trong', 400)
    }
    if (typeof password !== 'string' || !password.trim()) {
        throw createError('Password khong duoc de trong', 400)
    }
}
export const validateUpdateProfile = (data) => {
    const { fullName, phone } = data
    if (fullName === undefined && phone === undefined) {
        throw createError('Khong co du lieu cap nhat', 400)
    }
    if (fullName !== undefined) {
        if (typeof fullName !== 'string' || fullName.trim().length < 2) {
            throw createError('Ho ten khong hop le', 400)
        }
    }
    if (phone !== undefined) {
        if (typeof phone !== 'string' || !/^0\d{9}$/.test(phone.trim())) {
            throw createError('SĐT khong hop le', 400)
        }
    }

}
import { createError } from '../utils/error.util.js'
export const validateIdProduct=(id)=>{
    if (!Number.isInteger(id)||id<1) {
        throw createError('ID san pham khong hop le',400)
    }
}
export const validateCreateProduct = ({ name, description, price, stock, category_id }) => {
    if (typeof name !== 'string' || name.trim().length < 2) {
        throw createError('Ten san pham khong hop le', 400)
    }
    if (typeof description !== 'string' || !description.trim()) {
        throw createError('Mo ta san pham khong hop le', 400)
    }
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        throw createError('Gia san pham phai lon hon 0', 400)
    }
    if (!Number.isInteger(stock) || stock < 0) {
        throw createError('So luong ton kho khong hop le', 400)
    }
    if (!Number.isInteger(category_id) || category_id < 1) {
        throw createError('ID danh muc san pham khong hop le', 400)
    }
}
export const validateUpdateProduct = (data) => {
    const { name, description, price, stock, category_id, is_active } = data
    if (Object.keys(data).length == 0) {
        throw createError('Khong co du lieu cap nhat', 400)
    }
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length < 2) {
            throw createError('Ten san pham khong hop le', 400)
        }
    }
    if (description !== undefined) {
        if (typeof description !== 'string' || !description.trim()) {
            throw createError('Mo ta san pham khong hop le', 400)
        }
    }
    if (price !== undefined) {
        if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
            throw createError('Gia san pham phai lon hon 0', 400)
        }
    }
    if (stock !== undefined) {
        if (!Number.isInteger(stock) || stock < 0) {
            throw createError('So luong ton kho khong hop le', 400)
        }
    }
    if (category_id !== undefined) {
        if (!Number.isInteger(category_id) || category_id < 1) {
            throw createError('ID danh muc san pham khong hop le', 400)
        }
    }
    if (is_active !== undefined) {
        if(typeof is_active!=='boolean'){
            throw createError('Trang thai san pham khong hop le',400)
        }
    }
    const allowedFields=['name','description','price','stock','category_id','is_active']
    if(Object.keys(data).some(key=>!allowedFields.includes(key))){
        throw createError('Du lieu chua truong khong duoc cap nhat',400)
    }

}
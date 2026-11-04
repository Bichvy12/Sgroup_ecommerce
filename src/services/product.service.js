import { getProductsFromDB, getProductByIdFromDB, createProductInDB, updateProductInDB, deleteProductInDB } from "../repositories/product.repository.js"
import { formatProduct, formatProductDetail, formatProducts } from "../utils/product.util.js"
import { createError } from "../utils/error.util.js"
import { validateCreateProduct,validateIdProduct,validateUpdateProduct } from "../validators/product.validator.js"
export const getAllProducts = async (includeInactive = false) => {
    const products = await getProductsFromDB(includeInactive)
    return formatProducts(products)
}
export const getProductById = async (id) => {
    const productId = Number(id);
    validateIdProduct(productId)
    const product = await getProductByIdFromDB(productId)
    if (!product || !product.is_active) {
        throw createError(`Khong tim thay san pham voi ID: ${id}`, 404)
    }
    return formatProductDetail(product)
}
export const createNewProduct = async (productData) => {
    const { name, description, price, stock, category_id } = productData
    const is_active = 1
    validateCreateProduct({ name, description, price, stock, category_id })
    const newProduct = await createProductInDB(name, description, price, stock, category_id, is_active)
    return formatProductDetail(newProduct)
}
export const updateProduct = async (id, productData) => {
    const productID = Number(id)
    validateIdProduct(productID)
    const product = await getProductByIdFromDB(productID)
    if (!product) {
        throw createError(`Khong tim thay san pham voi ID: ${id}`, 404)
    }
    validateUpdateProduct(productData)
    const updateData={
        name:productData.name!==undefined?productData.name.trim():product.name,
        description:productData.description!==undefined?productData.description.trim():product.description,
        price:productData.price!==undefined?productData.price:product.price,
        stock:productData.stock!==undefined?productData.stock:product.stock,
        category_id:productData.category_id!==undefined?productData.category_id:product.category_id,
        is_active:productData.is_active!==undefined?productData.is_active:product.is_active,
    }
    const newProduct=await updateProductInDB(productID, updateData.name, updateData.description, updateData.price, updateData.stock, updateData.category_id, updateData.is_active)
    return formatProductDetail(newProduct)
}
export const deleteProduct = async (id) => {
    const productID = Number(id)
    validateIdProduct(productID)
    const product = await getProductByIdFromDB(productID)
    if (!product) {
        throw createError(`Không tìm thấy sản phẩm với ID ${id}`,404)
    }
    await deleteProductInDB(productID)
    return true
}
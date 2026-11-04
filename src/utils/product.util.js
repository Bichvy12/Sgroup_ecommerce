export const formatProductDetail = (product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    stock: product.stock,
    categoryName: product.category_name,
    isActive: product.is_active,
    createdAt: product.created_at,
    updatedAt: product.updated_at
})
export const formatProduct = (product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    isActive: product.is_active
})
export const formatProducts = (products) => products.map(formatProduct)
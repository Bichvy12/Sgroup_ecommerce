import * as productService from '../services/product.service.js'

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts()
        return res.status(200).json({
            success: true,
            data: products,
        })
    } catch (err) {
        next(err)
    }
}
export const adminGetAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts(true)
        return res.status(200).json({
            success: true,
            data: products,
        })
    } catch (err) {
        next(err)
    }
}
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await productService.getProductById(id);
        return res.status(200).json({
            success: true,
            data: product,
        })
    } catch (err) {
        next(err)
    }
}
export const createProduct = async(req,res,next)=>{
    try{
        const productData=req.body
        const newProduct=await productService.createNewProduct(productData)
        return res.status(201).json({
            success: true,
            message:'Tao san pham thanh cong',
            data: newProduct
        })
    }catch (err) {
        next(err)
    }
}
export const updateProduct=async(req,res,next)=>{
    try{
        const {id}=req.params
        const productData=req.body
        const newProduct=await productService.updateProduct(id,productData);
        return res.status(200).json({
            success:true,
            message:"Cap nhat san pham thanh cong",
            data:newProduct
        })
    }catch (err) {
        next(err)
    }
}
export const deleteProduct=async(req,res,next)=>{
    try{
        const {id}=req.params;
        await productService.deleteProduct(id);
        return res.status(200).json({
            success:true,
            message:`Xoa san pham voi id ${id} thanh cong`,
        })
    }catch(err){
        next(err)
    }
}
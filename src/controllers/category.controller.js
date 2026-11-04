import * as categoryService from '../services/category.service.js'

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories()
        return res.status(200).json({
            success: true,
            data: categories,
        })
    } catch (err) {
        next(err)
    }
}
export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await categoryService.getCategoryById(id)
        return res.status(200).json({
            success: true,
            data:category,
        })
    } catch (err) {
        next(err)
    }
}
export const createCategory = async(req,res,next)=>{
    try{
        const categoryData=req.body
        const newCategory=await categoryService.createCategory(categoryData)
        return res.status(201).json({
            success: true,
            message:'Tao danh muc thanh cong',
            data: newCategory
        })
    }catch (err) {
        next(err)
    }
}

export const deleteCategory=async(req,res,next)=>{
    try{
        const {id}=req.params;
        await categoryService.deleteCategory(id);
        return res.status(200).json({
            success:true,
            message:`Xoa danh muc voi id ${id} thanh cong`,
        })
    }catch(err){
        next(err)
    }
}
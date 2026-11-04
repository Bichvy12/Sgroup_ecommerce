import * as categoryRespository from "../repositories/category.repository.js"
import {validateCreateCategory, validateIdCategory} from "../validators/category.validator.js"
import { createError } from "../utils/error.util.js"
export const getAllCategories=async()=>{
    return await categoryRespository.getAllCategoryInDB()
}
export const getCategoryById=async(id)=>{
    const categoryId=Number(id)
    validateIdCategory(categoryId)
    const category=await categoryRespository.getCategoryByIdFromDB(categoryId)
    if(!category){
        throw createError('Khong tim thay danh muc',404)
    }
    return category
}   
export const createCategory=async(data)=>{
    validateCreateCategory(data)
    const name=data.name.trim()
    const categoryId=await categoryRespository.createCategoryInDB(name)
    return await categoryRespository.getCategoryByIdFromDB(categoryId)
}
export const deleteCategory=async(id)=>{
    const categoryId=Number(id)
    validateIdCategory(categoryId)
    const category=await categoryRespository.getCategoryByIdFromDB(categoryId)
    if(!category){
        throw createError('Khong tim thay danh muc',404)
    }
    const totalProducts=await categoryRespository.countProductsByCategoryFromDB(categoryId)
    if(totalProducts>0){
        throw createError('Khong the xoa danh muc dang co san pham',400)
    }
    await categoryRespository.deleteCategoryFromDB(categoryId)
    return true
}
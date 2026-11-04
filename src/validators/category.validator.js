import {createError} from "../utils/error.util.js"
export const validateCreateCategory=({name})=>{
    if(typeof name !=='string'||name.trim().length<2){
        throw createError('Ten danh muc khong hop le',400)
    }
}
export const validateIdCategory=(id)=>{
    if (!Number.isInteger(id)||id<1) {
        throw createError('ID danh muc khong hop le',400)
    }
}
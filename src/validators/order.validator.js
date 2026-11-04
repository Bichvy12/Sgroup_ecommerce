import { createError } from "../utils/error.util.js"
import { validateIdProduct } from "./product.validator.js"
export const validateCreateOrder=({items,shipping_address,receiver_phone, note})=>{
    if(!Array.isArray(items)||items.length===0){
        throw createError('Don hang phai co it nhat 1 san pham',400)
    }
    const productIDs=new Set()
    for(let item of items){
        if(!item||typeof item!=='object'||Array.isArray(item)){
            throw createError('San pham khong hop le',400)
        }
        const {product_id,quantity}=item
        validateIdProduct(product_id)
        if(!Number.isInteger(quantity)||quantity<1){
            throw createError('So luong dat hang khong hop le',400)
        }
        if(productIDs.has(product_id)){
            throw createError('Co san pham bi trung trong don hang',400)
        }
        productIDs.add(product_id)
    }
    if(typeof shipping_address!=='string'||!shipping_address.trim()){
        throw createError('Dia chi dat hang khong hop le',400)
    }
    if(typeof receiver_phone!=='string'|| !/^0\d{9}$/.test(receiver_phone.trim())){
        throw createError('So dien thoai dat hang khong hop le',400)
    }
    if(typeof note!=='string'&&note!==undefined&&note!==null){
        throw createError('Ghi chu khong hop le',400)
    }
}
export const validateOrderId=(id)=>{
    if(!Number.isInteger(id)||id<1){
        throw createError('ID don hang khong hop le',400)
    }
}
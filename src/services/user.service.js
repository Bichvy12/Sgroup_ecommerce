import {
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserProfileInDB
} from '../repositories/user.repository.js'
import { createError } from '../utils/error.util.js'
import { formatUser } from '../utils/user.utils.js'
import { validateUpdateProfile } from '../validators/user.validator.js'

export const getMyProfile=async(userId)=>{
  const user=await getUserByIdFromDB(userId)
  if(!user){
    throw createError(`Khong tim thay nguoi dung voi ID: ${userId}`,404)
  }
  return formatUser(user)
}
export const updateMyProfile=async(userId,data)=>{
  validateUpdateProfile(data)
  const user=await getUserByIdFromDB(userId)
  if(!user){
    throw createError(`Khong tim thay nguoi dung voi ID: ${userId}`,404)
  }
  const {fullName,phone}=data
  const newName=fullName!==undefined?fullName.trim():user.full_name
  const newPhone=phone!==undefined?phone.trim():user.phone
  const updateProfile=await updateUserProfileInDB(userId,newName,newPhone)
  return formatUser(updateProfile)
}

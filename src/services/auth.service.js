import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {
  getUserByEmailFromDB,
  createUserInDB,
  saveRefreshTokenFromDB,
  getRefreshTokenFromDB,
  removeRefreshTokenFromDB
} from '../repositories/user.repository.js'
import { createError } from '../utils/error.util.js'
import { formatUser } from '../utils/user.utils.js'
import { validateRegister,validateLogin } from '../validators/user.validator.js'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const EXP_IN = process.env.EXP_IN
const REFRESH_EXP_IN = process.env.REFRESH_EXP_IN

export const registerUser = async ({ fullName, email, password,phone,}) => {
  const role='user'
  validateRegister({fullName,email,password,phone})
  const existingUser = await getUserByEmailFromDB(email)
  if (existingUser) {
    throw createError('Email da ton tai',409)
  }
  const salt = await bcrypt.genSalt(10)
  const password_hash = await bcrypt.hash(password, salt)
  const createdUser = await createUserInDB({
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    password_hash,
    phone:phone.trim(),
    role
  })

  return formatUser(createdUser);
}
export const loginUser = async ({ email, password }) => {
  validateLogin({email,password})
  const user = await getUserByEmailFromDB(email.trim().toLowerCase());
  if (!user) {
    throw createError('Email hoac password khong dung',401)
  }
  const passValid = await bcrypt.compare(password, user.password_hash);
  if (!passValid) {
    throw createError('Email hoac password khong dung',401)
  }
  if(!user.is_active){
    throw createError('Tai khoan bi khoa',403)
  }
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: EXP_IN });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP_IN });
  await saveRefreshTokenFromDB(user.id, refreshToken);
  return { accessToken, refreshToken };
}
export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw createError('Refresh token khong duoc de trong',400)
  }
  await removeRefreshTokenFromDB(refreshToken);
  return {
    message: 'Dang xuat thanh cong'
  }
}
export const refreshTokenSer = async (refreshToken) => {
  if (!refreshToken) {
    throw createError('Refresh token khong duoc de trong',400)
  }
  const exitingToken = await getRefreshTokenFromDB(refreshToken);
  if (!exitingToken) {
    throw createError('Refresh token khong hop le hoac da thu hoi',403)
  }
  try {
    const decode = jwt.verify(refreshToken, REFRESH_SECRET);
    const payload = { id: decode.id, email: decode.email, role: decode.role }
    const newAccessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: EXP_IN })
    return { accessToken: newAccessToken }
  } catch (err) {
    throw createError('Refresh token khong hop le hoac da thu hoi',403)
  }
}
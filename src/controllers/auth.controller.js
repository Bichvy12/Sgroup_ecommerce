import * as authService from '../services/auth.service.js'

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phone, role } = req.body
    const newUser = await authService.registerUser({ fullName, email, password, phone, role })
    return res.status(201).json({
      success: true,
      message: 'Dang ky nguoi dung thanh cong',
      data: newUser,
    })
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const tokens = await authService.loginUser({ email, password })
    return res.status(200).json({
      success: true,
      message: 'Dang nhap thanh cong',
      data: tokens
    })
  } catch (error) {
    next(error)
  }
}
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logoutUser(refreshToken);
    return res.status(200).json({
      success: true,
      message: result.message
    })
  } catch (error) {
    next(error)
  }
}
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const data = await authService.refreshTokenSer(refreshToken)
    return res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}
export const formatUser = ({ id, full_name, email, phone, role, is_active}) => ({
  id,
  fullName: full_name,
  email,
  phone,
  role,
  isActive: is_active
})
export const formatUsers = (users) => users.map(formatUser)

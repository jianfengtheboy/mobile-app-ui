// 用户信息
export interface IUser {
  userId: string
  // 邮箱
  email: string
  // 手机号
  phonenumber: string
  // 用户名
  userName: string
  // 用户头像
  avatar?: string
  // 用户角色
  roles: []
  // 用户详情
  user: {}
  // 按钮权限
  permissions: []
}
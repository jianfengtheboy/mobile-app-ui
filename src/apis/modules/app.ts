import request from '@/request/index'

// 获取验证码
export const getCaptcha = () => request.get('/captchaImage')

// 登录
export const login = data => request.postParams('/login', data)

// 获取用户信息
export const getUserInfo = () => request.get('/getInfo')

// 退出登录
export const logout = () => request.post('/logout')

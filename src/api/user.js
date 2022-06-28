import request from '@/utils/request'

// 获取短信验证码
export const getSmsCode = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`
})

// 登录
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

// 获取用户自己信息
export const userInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
})

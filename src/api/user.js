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

import request from '@/utils/request'

// 获取用户的频道
export const getMyChannels = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})

// 获取文章新闻推荐
export const getArticles = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})

// 获取所有频道列表
export const getAllChannels = () => request({
  method: 'GET',
  url: '/v1_0/channels'
})

// 添加用户频道、
export const addChannel = channel => request({
  method: 'PATCH',
  url: '/v1_0/user/channels',
  data: {
    channels: [channel]
  }
})

// 添加用户频道、
export const deleteChannel = target => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${target}`
})

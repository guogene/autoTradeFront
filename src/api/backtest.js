import request from '@/utils/request'

export function buildBacktest(buildData) {
  return request({
    url: '/api/buildBackTest',
    method: 'post',
    data: buildData
  })
}

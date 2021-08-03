import request from '@/utils/request'

export function createGame(data) {
  return request({
    url: '/game/new',
    method: 'post',
    data
  })
}

export function getGameList() {
  return request({
    url: '/game/list',
    method: 'get'
  })
}

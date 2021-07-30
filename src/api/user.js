import request from '@/utils/request'

export function register(data) {
  console.log(JSON.stringify(data))
  return request({
    url: '/api/v1/user',
    method: 'post',
    data
  })
}

export function getVerifyCode(email) {
  return request({
    url: '/api/v1/user/verify?email=' + email,
    method: 'put'
  })
}

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

import request from '@/utils/request'

export function getVerifyCode(email, t) {
  return request({
    url: '/verify/code',
    method: 'get',
    params: {
      username: email,
      type: t
    }
  })
}

export function register(data) {
  console.log(JSON.stringify(data))
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

import request from '@/utils/request'

const UserMethod = {
  LOGIN: '/control/user/login' // 登录接口
}
export function login(username, password) {
  return request.post(UserMethod.LOGIN, { userName: username, password: password })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

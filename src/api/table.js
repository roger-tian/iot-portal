import request from '@/utils/request'

export function getList(pageNo) {
  return request.post('/control/operate', { pageNo: pageNo })
}

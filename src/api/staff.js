import request from '../utils/request'
const staffInfo = () => {
  return request({
    methods: 'get',
    url: '/static/staffInfo.json'
  })
}
const staffInfo2 = (row) => {
  return request({
    methods: 'put',
    url: '/static/staffInfo2.json',
    data: row
  })
}
export { staffInfo, staffInfo2 }

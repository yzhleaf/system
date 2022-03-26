import axios from 'axios'
import {Message} from 'element-ui'
const service = axios.create({
  // baseURL: process.env.HOST
  // baseURL: '/api'
})
service.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.status) {
      if (response.data.code === 501) {
        Message.error({message: response.data.message})
        return false
      } else {
        console.log(response.data)
        return response.data
      }
    }
  },
  error => {
    if (error.status === 404) {
      Message.error({message: '页面没找到'})
    }
  })
export default service

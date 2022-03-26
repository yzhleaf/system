import request from '../utils/request'
const login = (name, password) => {
  return request({
    methods: 'get',
    url: '/static/login.json',
    data: {
      name,
      password
    }
  })
}
export { login }

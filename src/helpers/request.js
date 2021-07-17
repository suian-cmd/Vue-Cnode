import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    // console.log(option)
    axios(option)
      .then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Message.error(res)
          reject(res)
        }
      }).catch(() => {
        Message.error('请求失败')
        reject({ msg: '请求失败' })
      })
  })
}

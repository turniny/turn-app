import axios from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // if (getToken() && !isToken) {
    //   config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  (error: any) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  async (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      // 无权限拦截逻辑
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (!/20\d/.test(code)) {
      return Promise.reject(code)
    }
    // 正常响应成功流程
    return res.data
  },
  (error: any) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service

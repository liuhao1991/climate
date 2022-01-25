/*
 * @Author: lh@metgs.com
 * @Date: 2020-08-24 09:19:04
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 16:03:13
 * @Description: axios封装
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const duration = 3 * 1000
function request (axiosConfig) {
  const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE, // 设置统一的请求前缀
    timeout: 10000 // 设置统一的超时时长

  })

  // 可以增加需要传到后端的token数据
  service.interceptors.request.use((config) => {
    return config
  })

  // response interceptor
  // 后端返回的报文格式 { code: 0 | 1, data: [], message: '成功' }
  service.interceptors.response.use(
    (response) => {
      const res = response.data
      if (+res.code !== 0) {
        const message = res.message || '网络请求失败'
        ElMessage({
          showClose: true,
          message,
          type: 'error',
          duration
        })
        return Promise.reject(message)
      } else {
        return res.data
      }
    },
    (error) => {
      const message = error.message || '网络请求失败'
      ElMessage({
        showClose: true,
        message: message,
        type: 'error',
        duration
      })
      return Promise.reject(message)
    }
  )
  return service(axiosConfig)
}

export default request

/*
 * @Author: lh@metgs.com
 * @Date: 2022-01-17 14:37:35
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 16:03:51
 * @Description: ...
 */
import request from './request'

export function testGet (params) {
  return request({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    params
  })
}

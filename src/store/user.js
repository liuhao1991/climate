/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-06 11:29:39
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-17 14:41:35
 * @Description: ...
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    role: null
  }),
  actions: {
    setRole (role) {
      this.role = role
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }

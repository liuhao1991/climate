/*
 * @Author: lh@metgs.com
 * @Date: 2021-12-07 15:08:59
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 15:56:42
 * @Description: ...
 */
import { defineStore } from 'pinia'
import settings from '@/settings'
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    ...settings
  }),
  actions: {
    changeSetting (data) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key]
          this[key] = element
        }
      }
    }
  }
})

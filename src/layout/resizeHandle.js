/*
 * @Author: lh@metgs.com
 * @Date: 2021-11-08 18:12:28
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-07 13:55:46
 * @Description: ...
 */
import store from '@/store'
import { onBeforeMount, onUnmounted, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
export const resizeEventsInit = () => {
  const WIDTH = 992
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const app = computed(() => {
    return store.state.app
  })
  const flag = isMobile()
  if (flag) {
    store.dispatch('app/toggleDevice', 'mobile')
    store.dispatch('app/closeSideBar', { withoutAnimation: true })
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      const mobile = isMobile()
      store.dispatch('app/toggleDevice', mobile ? 'mobile' : 'desktop')
      if (mobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }
  onBeforeRouteUpdate(() => {
    if (app.value.device === 'mobile' && app.value.sidebar.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}

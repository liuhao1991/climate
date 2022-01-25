<!--
 * @Author: lh@metgs.com
 * @Date: 2021-11-08 18:12:28
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 15:09:26
 * @Description: ...
-->
<template>
  <div>
    {{ activeMenu }}111
    <!-- <Logo :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="(route, index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import Logo from './Logo'
import SidebarItem from './SidebarItem.vue'
// css module启用，文件名需为.module.格式。
import variables from '@/style/global/variables.module.less'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
export default {
  components: {
    SidebarItem
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const appStore = useAppStore()
    const routes = router.options.routes
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const isCollapse = computed(() => {
      return !appStore.sidebar.opened
    })
    return {
      variables,
      routes,
      activeMenu,
      isCollapse
    }
  }
}
</script>

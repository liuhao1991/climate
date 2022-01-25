<!--
 * @Author: lh@metgs.com
 * @Date: 2022-01-25 14:09:42
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 16:15:24
 * @Description: ...
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div class="wrapper-top">
      <!-- <img src="@/assets/webImg/logo-icon.png" /> -->
      <span class="text">
        {{ title }}
      </span>
    </div>
    <div class="wrapper-main">
      <div
        v-if="device === 'mobile' && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <Sidebar class="sidebar-container" v-if="showSidebar" />
      <div class="main-container" :class="{ hasTagsView: needTagsView, hasNavbar: needNavbar, showSidebar }">
        <div :class="{ 'fixed-header': fixedHeader }">
          <Navbar v-if="needNavbar"/>
          <TagsView v-if="needTagsView" />
        </div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'
// import { useAppStore } from 'vuex'
// import { resizeEventsInit } from "@/layout/resizeHandle";
import { Sidebar, Navbar, AppMain, TagsView } from '@/layout/index'
import '@/style/global/index.less' // global css

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView
  },
  setup () {
    const appStore = useAppStore()
    const settingsStore = useSettingsStore()
    const sidebar = computed(() => {
      return appStore.sidebar
    })
    const device = computed(() => {
      return appStore.device
    })
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      }
    })
    // resizeEventsInit();
    return {
      classObj,
      handleClickOutside: () => {
        appStore.$dispatch('closeSideBar', { withoutAnimation: false })
      },
      device,
      needTagsView: settingsStore.tagsView,
      fixedHeader: settingsStore.fixedHeader,
      needNavbar: settingsStore.navbar,
      showSidebar: settingsStore.showSidebar,
      title: settingsStore.title,
      sidebar
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/global/variables.module.less";
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 14px;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  &.mobile .wrapper-top img {
    height: 40px;
    // width: 194px;
  }
}
.wrapper-top {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #242F42;
  padding-left: 10px;
  overflow: hidden;
  z-index: 99;
  img {
    vertical-align: middle;
    height: 34px;
    margin: 0 5px;
  }
  .text {
    font-size: 20px;
    color: #fff;

  }
}
.wrapper-main {
  position: absolute;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
.drawer-bg {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 9;
  width: calc(100%);
  transition: width 0.28s;
}
.showSidebar .fixed-header {
  width: calc(100% - @sideBarWidth);
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

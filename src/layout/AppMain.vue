<!--
 * @Author: lh@metgs.com
 * @Date: 2021-11-08 18:12:28
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2022-01-25 15:38:10
 * @Description: ...
-->
<template>
  <section class="app-main">
    <div class="app-main-inner">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </div>
    <div class="bottom">
      杭州幂拓科技有限公司技术支持
    </div>
  </section>
</template>

<script>
import { useSettingsStore } from '@/store/settings'
export default {
  name: 'AppMain',
  setup () {
    const settingsStore = useSettingsStore()
    return {
      settingsStore
    }
  }
}
</script>

<style scoped lang="less">
.app-main {
  /* 50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  .app-main-inner {
    margin: 20px 20px 0;
    background: #fff;
    // min-height: calc(100vh - 200px);
    min-height: calc(100vh - 140px);
  }
}
.hasTagsView .fixed-header + .app-main {
  padding-top: 34px;
}

.hasTagsView.hasNavbar .fixed-header + .app-main {
  padding-top: 84px;
}

.fixed-header + .app-main {
  // padding-top: 50px;
  background: #f5f5f5;
}
.bottom {
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #b3b5b9;
  line-height: 12px;
  height: 12px;
  position: absolute;
  bottom: 11px;
  left: 0;
}

</style>

<style lang="less">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//   .fixed-header {
//     // padding-right: 15px;
//   }
// }
</style>

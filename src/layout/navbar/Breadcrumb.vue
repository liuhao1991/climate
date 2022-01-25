<!--
 * @Author: lh@metgs.com
 * @Date: 2021-11-08 18:12:28
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-07 13:56:02
 * @Description: ...
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { ref, watch, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    const levelList = ref(null)
    const route = useRoute()
    const router = useRouter()
    const getBreadcrumb = () => {
      levelList.value = route.matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }
    const { fullPath } = toRefs(route)
    watch(fullPath, () => {
      getBreadcrumb()
    })
    const pathCompile = (path) => {
      const { params } = route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(pathCompile(path))
    }
    getBreadcrumb()
    return { levelList, handleLink }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

<!--
 * @Author: lh@metgs.com
 * @Date: 2021-05-25 10:02:04
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-12-17 16:12:14
 * @Description: ...
-->
<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="pathHandler(onlyOneChild.path)">
        <el-menu-item
          :class="{ 'submenu-title-noDropdown': !isNest }"
          :index="pathHandler(onlyOneChild.path)"
        >
          <el-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon">
            <component :is="onlyOneChild.meta.icon" />
            <!-- <img
              :src="require('@/assets/images/navbar/' + onlyOneChild.meta.icon + '.png')"
              class="navbar-icon"
              v-if="onlyOneChild.name !== activeMenu"
            />
            <img
              :src="require('@/assets/images/navbar/' + onlyOneChild.meta.icon + '-active.png')"
              class="navbar-icon"
              v-else
            /> -->
          </el-icon>
          <template #title>
            {{ onlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <template v-else>
      <el-sub-menu ref="subMenu" popper-append-to-body :index="basePath">
        <template #title>
          <el-icon v-if="item.meta && item.meta.icon">
            <img
              :src="require('@/assets/images/navbar/' + item.meta.icon + '.png')"
              class="navbar-icon"
            />
          </el-icon>
          <span v-if="item.meta">
            {{ item.meta.title }}
          </span>
        </template>

        <sidebar-item
          v-for="(child, index) in item.children"
          :key="index"
          :is-nest="true"
          :item="child"
          :base-path="pathHandler(`${basePath}/${child.path}`)"
          class="nest-menu"
        />
      </el-sub-menu>
    </template>
  </div>
</template>

<script>
// import path from "path";
import AppLink from './Link'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Monitor, MessageBox, User } from '@element-plus/icons-vue'

export default {
  components: {
    AppLink,
    Monitor,
    MessageBox,
    User
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
    // activeMenu: {
    //   type: String,
    //   default: "",
    // },
  },
  setup (props) {
    const onlyOneChild = ref(null)

    const hasOneShowingChild = (children = [], parent) => {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })
      // console.log(onlyOneChild.value);
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        // onlyOneChild.value = showingChildren[0];
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const pathHandler = (routePath) => {
      if (routePath.indexOf(props.basePath) > -1) {
        return routePath
      }
      const length = props.basePath.length
      let span = ''
      if (props.basePath[0] === '/' && props.basePath[length - 1] !== '/') {
        span = '/'
      }
      return props.basePath + span + routePath
    }
    // 当前路由
    const route = useRoute()
    const activeMenu = ref('')
    activeMenu.value = route.name

    watch(
      () => route.path,
      () => {
        activeMenu.value = route.name
      }
    )
    // watchEffect(() => {
    //   if (!props.item.children) {
    //     return
    //   }
    //   // props.item.children.forEach(child => {
    //   //   console.log(`${props.basePath}/${child.path}`)
    //   // })
    //   // console.log(props.basePath, props.item.children)
    // })
    return {
      pathHandler,
      onlyOneChild,
      hasOneShowingChild,
      activeMenu
    }
  }
}
</script>

<style lang="less" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
::v-deep(.router-link-exact-active) {
  color: #fff;
  background-color: #1890ff;
  .el-menu-item {
    color: #fff;
  }
}
::v-deep(.el-menu-item) {
  height: 40px;
  line-height: 40px;
  // &.is-active {
  //   color: #fff;
  //   background-color: #1890ff;
  // }
}
.navbar-icon {
  display: block;
  height: 16px;
}
</style>

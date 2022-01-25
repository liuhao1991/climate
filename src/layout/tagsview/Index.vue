<template>
  <div id="tags-view-container" class="tags-view-container" ref="rootEl">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="closeMenu">
      <router-link
        v-for="(tag, index) in visitedViews"
        :ref="setItemRef"
        :key="index"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.path,
          query: tag.query,
          fullPath: tag.fullPath,
          params: tag.params || {},
        }"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span>
          {{ tag.title }}
        </span>
        <el-icon
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <close />
        </el-icon>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: position.left + 'px', top: position.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭当前
      </li>
      <li @click="closeOthersTags">
        关闭其它
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import { Close } from '@element-plus/icons'
import { computed, watch, onMounted, nextTick, ref, reactive, unref } from 'vue'
import { useTagsViewStore } from '@/store/tagsView'
import { useRouter, useRoute } from 'vue-router'
import * as handler from './handler'
export default {
  components: { ScrollPane, Close },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const tagsViewStore = useTagsViewStore()
    const routes = router.getRoutes()
    const scrollPane = ref(null)

    const visible = ref(false)
    const position = reactive({ top: 0, left: 0 })
    const selectedTag = ref('')
    const affixTags = ref([])
    const tags = ref([])

    const visitedViews = computed(() => {
      return tagsViewStore.visitedViews
    })
    const initTags = () => {
      const myTags = handler.filterAffixTags(routes)
      affixTags.value = myTags
      for (const tag of myTags) {
        // Must have tag name
        if (tag.name) {
          tagsViewStore.addVisitedView(tag)
        }
      }
    }
    const addTags = () => {
      const { name } = route
      if (name && route.meta.tags) {
        tagsViewStore.addView(route)
      }
    }
    const moveToCurrentTag = () => {
      nextTick(() => {
        const myTags = visitedViews.value
        for (const tag of myTags) {
          if (tag.path === route.path) {
            scrollPane.value.moveToTarget(tag, myTags)
            if (tag.fullPath !== route.fullPath) {
              tagsViewStore.updateVisitedView(route)
            }
            break
          }
        }
      })
    }
    const refreshSelectedTag = (view) => {
      tagsViewStore.delCachedView(view).then(() => {
        const { fullPath } = view
        nextTick(() => {
          router.replace({
            path: fullPath
          })
        })
      })
    }
    const rootEl = ref(null)
    const openMenu = (tag, e) => {
      const el = unref(rootEl)
      const menuMinWidth = 105
      const offsetLeft = el.getBoundingClientRect().left // container margin left
      const offsetWidth = el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right
      position.left = Math.min(left, maxLeft)
      position.top = e.clientY - 50
      visible.value = true
      selectedTag.value = tag
    }
    const closeMenu = () => {
      visible.value = false
    }

    const setItemRef = (el) => {
      tags.value.push(el)
    }

    const isActive = (r) => {
      return r.path === route.path
    }

    const isAffix = (tag) => {
      return tag.meta && tag.meta.affix
    }

    const closeSelectedTag = (view) => {
      tagsViewStore.delView(view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }

    const closeOthersTags = () => {
      router.push(selectedTag.value)
      tagsViewStore.delOthersViews(selectedTag.value).then(() => {
        moveToCurrentTag()
      })
    }
    const closeAllTags = (view) => {
      tagsViewStore.delAllViews().then(({ visitedViews }) => {
        if (affixTags.value.some((tag) => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }
    const toLastView = (visitedViews, view) => {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({ path: '/redirect' + view.fullPath })
        } else {
          router.push('/')
        }
      }
    }

    watch(visible, (val) => {
      if (val) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })
    watch(
      () => route.fullPath,
      () => {
        tags.value = []
        addTags()
        moveToCurrentTag()
      }
    )
    onMounted(() => {
      initTags()
      addTags()
    })
    return {
      scrollPane,
      visitedViews,
      visible,
      position,
      affixTags,
      selectedTag,
      tags,
      rootEl,
      openMenu,
      closeMenu,
      moveToCurrentTag,
      refreshSelectedTag,
      setItemRef,
      isActive,
      isAffix,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags
    }
  }
}
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.router-link-exact-active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 14px;
      height: 14px;
      // vertical-align: middle;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      margin-left: 2px;
      top: 2px;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

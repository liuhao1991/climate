<template>
  <div class="navbar">
    <!-- 导航栏图标 -->
    <div class="hamburger-container" style="padding: 0 10px" @click="toggleSideBar">
      <el-icon :class="['el-icon-s-fold', { active: !appStore.sidebar.opened }]">
        <Fold />
      </el-icon>
    </div>
    <!-- 导航栏 -->
    <Breadcrumb class="breadcrumb-container" />
    <!-- 登出功能等 -->
    <!-- <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>
            {{ userInfo.name }}
          </span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item divided @click="logout">
              <span style="display: block; margin: 0 auto">
                注销
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script>
import { Fold } from '@element-plus/icons'
import { useAppStore } from '@/store/app'
import Breadcrumb from './Breadcrumb'

export default {
  components: {
    Breadcrumb,
    Fold
  },
  setup () {
    const appStore = useAppStore()
    const toggleSideBar = () => {
      appStore.toggleSideBar()
    }

    return {
      toggleSideBar,
      appStore
    }
  }
}
</script>
<style>
.el-dropdown-menu .el-dropdown-menu__item {
  width: 40px;
  padding: 0 !important;
}
.el-dropdown-menu--small .el-dropdown-menu__item.el-dropdown-menu__item--divided:before {
  margin: 0;
}
</style>
<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-left: 10px;

  .hamburger-container {
    // display: none;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: all 0.3s;
    -webkit-tap-highlight-color: transparent;
    i {
      line-height: 50px;
      font-size: 24px;
      transition: all 0.3s;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .el-icon-s-fold.active {
      transform: rotateY(180deg);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    :deep(.avatar-container) {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        cursor: pointer;

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

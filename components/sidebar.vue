<template>
  <div class="sidebar">
    <el-menu>
      <el-submenu v-for="(menuItem, menuIndex) in menuStructure.children" :key="'menu' + String(menuIndex)" :index="String(menuIndex)">
        <template slot="title">
          <i :class="'el-icon-' + menuItem.icon" />{{ menuItem.name }}
        </template>
        <el-menu-item v-for="(submenuItem, submenuIndex) in menuItem.children" :key="'submenu' + String(menuIndex) + '-' + String(submenuIndex)" :index="String(menuIndex) + '-' + String(submenuIndex)">
          {{ submenuItem.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menuStructure } from '@/assets/structure'

export default {
  data() {
    return {
      menuStructure
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  background-color: rgb(4, 21, 39)
  height: 100%

  .el-menu
    background-color: transparent

    .el-menu-item, .el-submenu__title, .el-submenu__title i
      color: #fff

    .el-submenu__title:hover, .el-menu-item:hover
      background-color: rgb(63, 144, 247)
</style>

<template>
  <div class="sidebar">
    <img src="~/static/images/logo.png" alt="" class="logo">
    <el-menu>
      <el-submenu v-for="(menuItem, menuIndex) in menuStructure.children" :key="'menu' + String(menuIndex)" :index="String(menuIndex)">
        <template slot="title">
          <img v-if="menuItem.icon" :src="menuItem.icon" alt="" class="menu-icon">{{ menuItem.name }}
        </template>
        <nuxt-link v-for="(submenuItem, submenuIndex) in menuItem.children" :key="'submenu' + String(menuIndex) + '-' + String(submenuIndex)" :to="submenuItem.addr">
          <el-menu-item :index="String(menuIndex) + '-' + String(submenuIndex)">
            {{ submenuItem.name }}
          </el-menu-item>
        </nuxt-link>
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
  padding-top: 20px

  .logo
    text-align: center
    margin: 20px auto
    display: block

  .el-menu
    background-color: transparent
    border: none

    .el-menu-item, .el-submenu__title, .el-submenu__title i
      color: #fff

    .el-submenu__title:hover, .el-menu-item:hover, .el-menu-item.is-active, .el-submenu__title.is-active
      background-color: rgb(63, 144, 247)

    .menu-icon
      margin-right: 15px
      height: 16px

</style>

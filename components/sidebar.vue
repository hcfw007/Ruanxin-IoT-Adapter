<template>
  <div class="sidebar">
    <img src="~/static/images/logo.png" alt="" class="logo">
    <el-menu ref="menu">
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
import { menuStructure } from '@/assets/config'

export default {
  data() {
    return {
      menuStructure
    }
  },
  watch: {
    $route(to, from) {
      this.setupMenu(to.path)
    }
  },
  mounted() {
    this.setupMenu(this.$route.path)
  },
  methods: {
    setupMenu(url) {
      let paths = url.split('/')
      if (paths.length < 2) { return }
      // 一级目录
      let level1 = paths[1]
      for (let index = 0; index < menuStructure.children.length; index++) {
        let menuItem = menuStructure.children[index]
        if (menuItem.id === level1) {
          this.$refs.menu.openMenu(String(index))

          // 二级目录
          if (paths.length > 2) {
            let level2 = paths[2]
            for (let subIndex = 0; subIndex < menuItem.children.length; subIndex++) {
              let suemenuItem = menuItem.children[subIndex]
              if (suemenuItem.id === level2) {
                this.$refs.menu.activeIndex = String(index) + '-' + String(subIndex)
                break
              }
            }
          }
          break
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  background-image: var(--dark-background-image)
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

    .el-submenu__title
      font-size: 18px
      padding-left: 40px !important

    .el-menu-item
      font-size: 16px
      padding-left: 60px !important

    .el-submenu__title:hover, .el-menu-item:hover, .el-menu-item.is-active, .el-submenu__title.is-active
      background-color: var(--sub-primary)

    .menu-icon
      margin-right: 15px
      height: 18px

</style>

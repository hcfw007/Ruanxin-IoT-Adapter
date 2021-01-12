<template>
  <div class="navbar">
    <el-row class="nav-row">
      <el-col :span="12" style="margin-top: 30px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in path" :key="'path' + index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="text-right" style="margin-top: 22px">
        <!-- <i class="el-icon-search" />
        <el-badge :value="5" class="item">
          <i class="el-icon-message-solid" />
        </el-badge>
        <el-divider direction="vertical" /> -->
        <span class="user">欢迎，<nuxt-link to="/userManagement/userInfo"><span class="username">{{ username }}</span></nuxt-link></span>
        <span class="quit" style="margin-left: 10px"><a :href="loginURL"><i class="el-icon-switch-button" style="margin-right: 10px" />退出</a></span>
        <!-- <el-avatar icon="el-icon-user-solid" /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { menuStructure } from '~/assets/config'
import { loginURL } from '~/assets/ajax'

export default {
  data() {
    return {
      path: [],
      username: '用户',
      loginURL
    }
  },
  watch: {
    $route(to, from) {
      this.getPath()
    }
  },
  created() {
    this.getPath()
  },
  methods: {
    getPath() {
      let tree = menuStructure
      let paths = this.$route.path.split('/')
      let p = 1
      let path = [{
        name: '首页',
        link: '/'
      }]
      while (p < paths.length && tree.children) {
        for (let item of tree.children) {
          if (item.id === paths[p]) {
            path.push({
              name: item.name,
              link: item.addr
            })
            tree = item
            break
          }
        }
        p += 1
      }
      this.path = path
    }
  }
}
</script>

<style lang="stylus">
navbarHeight = 70px // height of navbar content

.navbar
  background-color: #fff
  color: rgba(0, 0, 0, 0.65)
  height: navbarHeight // - 2 for border width
  padding: 0 40px
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)

  .el-breadcrumb__inner
    color: rgba(0, 0, 0, 0.65) !important

  .nav-row
    height: 100%

  .username, .quit
    cursor: pointer

  .username
    color: var(--default-link-color)

  span, div
    vertical-align: baseline

  .el-avatar
    vertical-align: middle
img
  display: inline-block
</style>

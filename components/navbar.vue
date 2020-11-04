<template>
  <div class="navbar">
    <el-row class="nav-row">
      <el-col :span="12" style="margin-top: 30px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in path" :key="'path' + index" :to="item.link">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="text-right" style="margin-top: 18px">
        <i class="el-icon-search" />
        <el-badge :value="5" class="item">
          <i class="el-icon-message-solid" />
        </el-badge>
        <el-divider direction="vertical" />
        <span class="username">admin</span>
        <el-avatar icon="el-icon-user-solid" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { menuStructure } from '~/assets/config'

export default {
  data() {
    return {
      path: []
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
  height: navbarHeight // - 2 for border width
  padding: 0 40px

  .nav-row
    height: 100%

  span, div
    vertical-align: baseline

  .el-avatar
    vertical-align: middle
img
  display: inline-block
</style>

<template>
  <div class="navbar">
    <el-row class="nav-row">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in path" :key="'path' + index">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
  </div>
</template>

<script>
import { menuStructure } from '~/assets/structure'

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
          if (item.name === paths[p]) {
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

  .nav-row
    height: 100%
    padding: 30px

img
  display: inline-block
</style>

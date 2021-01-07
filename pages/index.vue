<template>
  <div>
    index
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    this.$router.push('/deviceAccess/productList')
  }
}
</script>

<style lang="stylus">
.banner-container
  position: relative

  .big-banner
    width: 100%
    height: 400px

  .banner-title
    position: absolute
    top: 15%
    width: 100%
    text-align: center
    font-size: 48px
    color: #fff
    line-height: 100px
    letter-spacing: 26px

.block-row

  .block-title
    width: 100%
    text-align: center

  &:nth-child(odd)
    background-color: rgb(42, 60, 76)
    color: #fff

  &:nth-child(even)
    background-color: #fff
    color: #333

  .content-block
    padding: 40px

  .intro-block-img
    height: 40px

  // 首页标签页的active样式
  .el-tabs__nav.is-left
    padding-right: 80px

  .el-tabs__item.is-left
    padding: 15px
    height: auto

  .tab-title
    background-color: rgba(242, 242, 242, 0.447058823529412)
    font-size: 30px
    color: #333
    text-align: center
    padding: 20px
    height: auto
    border-radius: 15px
    width: 100%

  .el-tabs__nav-wrap.is-left::after
    height: 0

  .el-tabs__active-bar.is-left
    height: 0 !important
    width: 0
    top: 35px
    right: 10px
    border-top: 21px solid transparent
    border-bottom: 21px solid transparent
    border-left: 30px solid rgb(24, 144, 255)
    background-color: transparent

    &::after
      content: '.'
      color: transparent
      position: absolute
      top: -15px
      left: -33px
      height: 0
      width: 0
      border-top: 15px solid transparent
      border-bottom: 15px solid transparent
      border-left: 24px solid #fff

  .trend-img
    height: 100%
    max-height: 330px
    width: 100%

  .coferences-title
    color: #fff
    font-size: 18px
    font-weight: 700

  .coferences-row-content
    color: rgba(215, 215, 215, 0.752941176470588)
    font-size: 14px

  .member-img
    width: 100%
    height: 160px

p
  text-indent: 2em
</style>

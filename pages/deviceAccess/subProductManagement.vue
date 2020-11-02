<template>
  <div class="sub-product-management main-content">
    <el-row>
      <el-col :span="12">
        <h3 class="page-title">
          子产品设备管理
        </h3>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button type="primary">管理子设备产品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="sub-product-container">
        <div v-for="(subProduct, index) in subProductList" :key="'subPproduct' + index" class="sub-product-block block-white">
          <div class="sub-product-delete-button clickable-text">
            删除
          </div>
          <div class="sub-product-title">
            {{ subProduct.name }}
          </div>
          <div class="sub-product-id">
            产品ID：{{ subProduct.id }}
          </div>
          <div class="sub-product-time">
            加入时间：{{ subProduct.joinDateTime | dateTimeFilter('yyyy-MM-dd hh:mm:ss') }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSubProductList } from '~/assets/getters'

export default {
  data() {
    return {
      subProductList: []
    }
  },
  created() {
    this.getSubProductList()
  },
  methods: {
    getSubProductList() {
      getSubProductList().then((data) => {
        this.subProductList = data
      })
    }
  }
}
</script>

<style lang="stylus">
.sub-product-management

  .sub-product-container
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: space-between

    .sub-product-block
      width: 31%
      padding: 20px
      margin-bottom: 30px
      border-radius: 10px
      position: relative

      .sub-product-title
        font-size: 18px
        font-weight: bold

      .sub-product-id, .sub-product-time
        margin-top: 10px
        color: #666
        font-size: 12px

      .sub-product-delete-button
        position: absolute
        top: 20px
        right: 20px

</style>

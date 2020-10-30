<template>
  <div class="product-list main-content">
    <el-row>
      <el-col :span="24" class="page-title-row">
        <h3 class="page-title">
          标准协议快速开发指南
        </h3>
        <span class="page-title-link">
          前往开发指南 &gt;
        </span>
        <span class="pange-title-hint">
          注：自定义协议产品需在第五步后额外进行部署适配器的操作
        </span>
      </el-col>
    </el-row>
    <el-row class="no-padding">
      <el-col :span="24" class="develop-step-row">
        <div v-for="(item, index) in rapidDevelopStep" :key="'step' + index" class="develop-step-block block-white block-round">
          <div class="develop-step-index" :style="{'background-color': colors['background-colors'][index], 'color': colors['font-colors'][index]}">{{ index + 1 }}</div>
          <div class="develop-step-hint">{{ item.name }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="product-general-info-row block-white block-round">
      <el-col :span="4">
        <div class="product-number">
          <div class="product-number-label">
            产品数量（个）
          </div>
          <div class="product-number-value">
            110999
          </div>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="seperator" />
      </el-col>
      <el-col :span="16">
        <div class="apply-link">
          <nuxt-link to="#">去申请 &gt;</nuxt-link>
        </div>
        <div class="apply-hint">
          注：创建产品后，需向雄安IoT平台申请设备唯一标识，该标识将作为设备在平台的全局唯一标识码。
        </div>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" class="add-product">添加产品</el-button>
      </el-col>
    </el-row>
    <el-row class="product-list-row block-white block-round">
      <el-col :span="24">
        <el-row v-for="product in productList" :key="'product' + product.id" class="product-block">
          <el-col :span="8" class="product-general-info">
            <div class="product-name">
              {{ product.name }}
            </div>
            <div class="product-tags">
              <el-tag v-for="(tag, index) in product.tags" :key="'product' + product.id + 'tag' + index" effect="dark">{{ tag }}</el-tag>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="product-IID-label product-label">
              产品IID
            </div>
            <div class="product-IID-value product-value">
              {{ product.IID }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="product-protocol-label product-label">
              协议
            </div>
            <div class="product-protocol-value product-value">
              {{ product.protocol }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="product-created-label product-label">
              创建时间
            </div>
            <div class="product-created-value product-value">
              {{ product.created }}
            </div>
          </el-col>
          <el-col :span="4" class="product-operators">
            <span class="product-operator">查看</span>
            <span class="product-operator">编辑</span>
            <span class="product-operator">删除</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { colors, rapidDevelopStep } from '~/assets/config'
import { getProductList } from '~/assets/getters'

export default {
  data() {
    return {
      colors,
      rapidDevelopStep,
      productList: []
    }
  },
  created() {
    this.getProductList()
  },
  methods: {
    getProductList() {
      getProductList().then((data) => {
        this.productList = data
      })
    }
  }
}
</script>

<style lang="stylus">
.product-list
  .develop-step-row
    display: flex
    justify-content: space-between

    .develop-step-block
      width: 300px
      height: 100px
      padding: 20px

      div
        display: inline-block

      .develop-step-index
        border-radius: 100px
        height: 60px
        width: 60px
        font-size: 30px
        line-height: 60px
        text-align: center
        vertical-align: middle

      .develop-step-hint
        font-size: 24px
        margin-left: 20%

  .product-number
    .product-number-label
      font-size: 18px
      color: #666

    .product-number-value
      margin-top: 15px
      font-size: 34px

  .apply-hint
    margin-top: 20px
    color: #666

  .add-product
    margin-top: 15px

  .product-name
    font-size: 20px
    font-weight: bold

  .product-tags
    margin-top: 15px

    .el-tag
      padding: 0 20px
      border-radius: 20px
      height: 22px
      line-height: 20px

      &:not(:first-child)
        margin-left: 10px

  .product-label
    font-size: 18px

  .product-value
    font-size: 18px
    margin-top: 15px

  .product-operators
    margin-top: 20px
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 16px

    .product-operator
      color: var(--default-link-color)
      cursor: pointer

  .product-block:not(:last-child)
    padding-bottom: 30px
    border-bottom: solid 1px #999
</style>

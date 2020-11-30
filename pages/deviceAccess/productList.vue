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
            {{ productList.length }}
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
        <el-button type="primary" class="add-product" @click="addProduct">添加产品</el-button>
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
              {{ product.id }}
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
              {{ product.created_at | dateTimeFilter }}
            </div>
          </el-col>
          <el-col :span="4" class="product-operators">
            <span class="clickable-text" @click="setAndView(product)">查看</span>
            <span class="clickable-text" @click="editProduct(product)">编辑</span>
            <span class="clickable-text disabled">删除</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-drawer
      :title="productDrawerMode + '产品'"
      :visible.sync="creatingProduct"
      direction="rtl"
      :modal="false"
    >
      <div class="drawer-content">
        <el-form :model="newProduct" label-width="120px">
          <el-form-item label="产品名称" required>
            <el-input v-model="newProduct.name" placeholder="请输入产品名称" />
          </el-form-item>
          <el-form-item label="行业-产品类别" required>
            <el-select v-model="newProduct.industry_id" placeholder="请选择行业" style="width: 49%">
              <el-option v-for="(industry, index) in industryList" :key="'industry' + index" :label="industry.name" :value="industry.id" />
            </el-select>
            <el-select v-model="newProduct.category_id" placeholder="请选择类别" style="width: 49%; margin-left: 1%">
              <el-option v-for="(category, index) in categoryList" :key="'category' + index" :label="category.name" :value="category.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="设备节点" required>
            <el-select v-model="newProduct.device_node" placeholder="请选择设备节点类型">
              <el-option label="直连设备" value="直连设备" />
              <el-option label="网关设备" value="网关设备" />
              <el-option label="子设备" value="子设备" />
            </el-select>
          </el-form-item>
          <el-form-item label="联网方式" required>
            <el-select v-model="newProduct.connection" placeholder="请选择连接方式">
              <el-option label="2G" value="2G" />
              <el-option label="4G" value="4G" />
              <el-option label="NBIoT" value="NBIoT" />
              <el-option label="Wifi" value="Wifi" />
              <el-option label="以太网接入" value="以太网接入" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="newProduct.model" placeholder="请输入产品型号" />
          </el-form-item>
          <el-divider />
          <el-form-item class="text-right">
            <el-button type="primary" :loading="postingNewProduct" @click="saveProduct()">保存</el-button>
            <el-button @click="creatingProduct = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { colors, rapidDevelopStep, productConfig } from '~/assets/config'
import { getIndustryList, getCategoryList, postNewProduct, getProductList, editProduct } from '~/assets/ajax'

export default {
  data() {
    return {
      colors,
      rapidDevelopStep,
      productList: [],
      industryList: [],
      categoryList: [],
      creatingProduct: false,
      newProduct: {
        productName: '',
        categoryId: '',
        industryId: '',
        deviceNode: '',
        connectionType: '',
        productModel: ''
      },
      postingNewProduct: false,
      productDrawerMode: '添加'
    }
  },
  created() {
    this.getProductList()
    this.getStaticList()
  },
  methods: {
    getStaticList() {
      getIndustryList(this, 'industryList')
      getCategoryList(this, 'categoryList')
    },
    getProductList() {
      getProductList(this, 'productList')
    },
    addProduct() {
      let product = Object.assign({}, productConfig.productProto)
      this.newProduct = product
      this.productDrawerMode = '添加'
      this.creatingProduct = true
    },
    editProduct(product) {
      // 根据原型的项目取出所需数据
      let _product = {}
      for (let item in productConfig.productProto) {
        _product[item] = product[item]
      }
      // 加入产品id信息
      _product.pid = product.pid
      _product.id = product.id
      this.newProduct = _product

      // 修改模式、显示抽屉
      this.productDrawerMode = '编辑'
      this.creatingProduct = true
    },
    async saveProduct() {
      let data = this.newProduct
      let productObj = {
      }
      for (let item in productConfig.productProto) {
        productObj[item] = data[item]
      }
      this.postingNewProduct = true
      let result
      if (this.productDrawerMode === '添加') {
        result = await postNewProduct(this, productObj, '添加产品成功！', '添加产品失败')
      } else {
        productObj.pid = this.newProduct.pid
        productObj.id = this.newProduct.id
        result = await editProduct(this, productObj, '修改产品成功！', '修改产品失败')
      }
      if (result) {
        this.creatingProduct = false
      }
      this.postingNewProduct = false
    },
    setAndView(product) {
      localStorage.setItem('currentProduct', JSON.stringify(product))
      this.$router.push('/deviceAccess/productPreview')
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

  .product-block:not(:last-child)
    padding-bottom: 30px
    border-bottom: solid 1px #999
</style>

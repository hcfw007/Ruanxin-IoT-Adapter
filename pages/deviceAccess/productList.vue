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
        <div v-for="(item, index) in rapidDevelopStep" :key="'step' + index" class="develop-step-block block-white ">
          <div class="develop-step-index" :style="{'background-color': colors['background-colors'][index], 'color': colors['font-colors'][index]}">{{ index + 1 }}</div>
          <div class="develop-step-hint">{{ item.name }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="product-list-row block-white">
      <el-col :span="24">
        <el-row>
          <el-col :span="12">
            <span class="product-number-label">产品数量（个）：</span>
            <span class="product-number-value">
              {{ productList.length }}
            </span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary" class="add-product" @click="addProduct">新增</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              :data="productList"
              border
            >
              <el-table-column
                prop="industry_name"
                label="行业"
              />
              <el-table-column
                prop="firm_name"
                label="厂商"
              />
              <el-table-column
                prop="category_name"
                label="设备类型"
              />
              <el-table-column
                prop="name"
                label="产品名称"
              />
              <el-table-column
                prop="pid"
                label="产品ID"
              />
              <el-table-column
                prop="protocol_type"
                label="协议类型"
              />
              <el-table-column
                prop="user_name"
                label="创建人"
              />
              <el-table-column
                label="创建时间"
                width="180"
              >
                <template slot-scope="scope">{{ scope.row.created_at.split('.')[0] }}</template>
              </el-table-column>
              <el-table-column
                label="发布状态"
              >
                <template slot-scope="scope">{{ scope.row.is_release ? '已发布' : '未发布' }}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="160"
              >
                <template slot-scope="scope">
                  <img src="@/static/images/icons/view.png" alt="" class="table-mini-image clickable" title="查看" @click="setAndView(scope.row)">
                  <img src="@/static/images/icons/edit.png" alt="" class="table-mini-image clickable" title="编辑" @click="editProduct(scope.row)">
                  <el-popconfirm title="确定要删除吗？" :disabled="scope.row.is_release" @confirm="deleteProduct(scope.row)">
                    <img
                      slot="reference"
                      src="@/static/images/icons/delete.png"
                      alt=""
                      class="table-mini-image clickable"
                      :class="{ disabled: scope.row.is_release }"
                      title="删除"
                    >
                  </el-popconfirm>
                  <img
                    v-if="!scope.row.is_release"
                    src="@/static/images/icons/publish.png"
                    alt=""
                    class="table-mini-image clickable"
                    title="发布"
                    @click="releaseProduct(scope.row)"
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-drawer
      :title="productDrawerMode + '产品'"
      :visible.sync="creatingProduct"
      direction="rtl"
      :wrapper-closable="false"
    >
      <div class="drawer-content">
        <el-form ref="productForm" :model="newProduct" label-width="120px" :rules="productFormRule">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="newProduct.name" placeholder="请输入产品名称" />
          </el-form-item>
          <el-form-item label="行业-产品类别" prop="category_id">
            <el-select v-model="newProduct.industry_id" placeholder="请选择行业" style="width: 49%" :disabled="productDrawerMode === '编辑'" @change="newProduct.category_id=''">
              <el-option v-for="(industry, index) in industryList" :key="'industry' + index" :label="industry.name" :value="industry.id" />
            </el-select>
            <el-select v-model="newProduct.category_id" placeholder="请选择类别" style="width: 49%; margin-left: 1%" :disabled="productDrawerMode === '编辑'">
              <el-option v-for="(category, index) in categoryFilteredByIndustry" :key="'category' + index" :label="category.name" :value="category.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="协议类型" prop="protocol_type">
            <el-select v-model="newProduct.protocol_type" placeholder="请选择设备协议类型" :disabled="productDrawerMode === '编辑'">
              <el-option label="MQTT协议" value="MQTT" />
              <el-option label="CoAP协议" value="CoAP" />
              <el-option label="Https协议" value="HTTPS" />
              <el-option label="TCP协议" value="TCP" />
              <el-option label="自定义协议" value="CUSTOM" />
            </el-select>
          </el-form-item>
          <el-form-item label="设备节点" prop="device_node">
            <el-select v-model="newProduct.device_node" placeholder="请选择设备节点类型" :disabled="productDrawerMode === '编辑'">
              <el-option label="直连设备" value="DIRECT" />
              <el-option label="网关设备" value="GATEWAY" />
              <el-option label="子设备" value="CHILD" />
            </el-select>
          </el-form-item>
          <el-form-item label="联网方式" prop="connection">
            <el-checkbox-group v-model="newProduct.connection" :disabled="productDrawerMode === '编辑'">
              <el-checkbox label="_2G">2G</el-checkbox>
              <el-checkbox label="_4G">4G</el-checkbox>
              <el-checkbox label="NBIoT">NBIoT</el-checkbox>
              <el-checkbox label="WIFI">Wifi</el-checkbox>
              <el-checkbox label="ETHERNET">以太网</el-checkbox>
              <el-checkbox label="OTHER">其他</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="产品型号" prop="model">
            <el-input v-model="newProduct.model" placeholder="请输入产品型号" />
          </el-form-item>
          <el-form-item label="产品描述" prop="remarks">
            <el-input v-model="newProduct.remark" type="textarea" maxlength="500" placeholder="最多500个字符" show-word-limit />
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
import { colors, rapidDevelopStep, productConfig, productFormRule } from '~/assets/config'
import { getIndustryList, getCategoryList, postNewProduct, getProductList, editProduct, deleteProduct, releaseProduct } from '~/assets/ajax'

export default {
  data() {
    return {
      colors,
      rapidDevelopStep,
      productList: [],
      industryList: [],
      categoryList: [],
      creatingProduct: false,
      newProduct: {},
      postingNewProduct: false,
      productDrawerMode: '添加',
      productFormRule
    }
  },
  computed: {
    categoryFilteredByIndustry() {
      return this.categoryList.filter(ele => ele.industry === this.newProduct.industry_id)
    }
  },
  created() {
    this.getProductList()
    this.getStaticList()
  },
  methods: {
    async releaseProduct(product) {
      if (product.is_release) {
        this.$toast('此产品已发布，无需重复发布', {
          customCss: {
            'background-color': '#67C23A',
            color: '#fff'
          }
        })
        return
      }
      let id = product.id
      await releaseProduct(this, null, '发布成功！', '发布失败', { id })
      this.getProductList()
    },
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
      let pass = true
      await this.$refs.productForm.validate((valid) => {
        pass = valid
      })
      if (!pass) { return }
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
      this.getProductList()
    },
    setAndView(product) {
      localStorage.setItem('currentProduct', JSON.stringify(product))
      this.$router.push('/deviceAccess/productPreview')
    },
    async deleteProduct(product) {
      await deleteProduct(this, null, '删除产品成功！', '删除产品失败', { id: product.id })
      this.getProductList()
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
      width: 19%
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
        font-size: 22px
        margin-left: 10px

  .product-number-label
    font-size: 22px
    color: #666

  .product-number-value
    margin-top: 30px
    font-size: 34px

  .apply-hint
    margin-top: 20px
    color: #666

  .add-product
    font-size: 14px
    height: 34px
    line-height: 34px
    padding: 0 15px
    text-align: center
    color: #fff
    border-radius: 5px
    background-color: #FFAC1E
    border-color: #FFAC1E

  .product-name
    font-size: 20px
    font-weight: bold
    cursor: pointer

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

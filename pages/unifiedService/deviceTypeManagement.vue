<template>
  <div class="device-type-management main-content">
    <el-row class="block-white block-round">
      <el-col :span="11">
        <el-row>
          <el-col :span="12">
            <span class="block-info-title">
              行业类别列表
            </span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary btn-gray">创建行业类别</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="category-container industry-container">
            <el-row v-for="(industry, index) in industryList" :key="'industry' + index" class="industry category">
              <el-col :span="12" class="industry-name category-name">
                {{ industry }}
              </el-col>
              <el-col :span="12" class="industry-operators category-operators text-right">
                <span class="clickable-text">上移</span>
                <span class="clickable-text">下移</span>
                <span class="clickable-text">编辑</span>
                <span class="clickable-text">删除</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" class="seperator-container">
        <div class="seperator" :style="{'height': seperatorLength}" />
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="12">
            <span class="block-info-title">
              产品类别列表
            </span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary btn-gray">创建产品类别</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="category-container industry-container">
            <el-row v-for="(productType, index) in productTypeList" :key="'industry' + index" class="industry category">
              <el-col :span="12" class="industry-name category-name">
                {{ productType }}
              </el-col>
              <el-col :span="12" class="industry-operators category-operators text-right">
                <span class="clickable-text">上移</span>
                <span class="clickable-text">下移</span>
                <span class="clickable-text">编辑</span>
                <span class="clickable-text">删除</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getIndustryList, getProductTypeList } from '~/assets/getters'
export default {
  data() {
    return {
      industryList: [],
      productTypeList: []
    }
  },
  computed: {
    seperatorLength() {
      return String(Math.max(this.industryList.length, this.productTypeList.length) * 84 + 65) + 'px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getIndustryList().then((data) => {
        this.industryList = data
      })
      getProductTypeList().then((data) => {
        this.productTypeList = data
      })
    }
  }
}
</script>

<style lang="stylus">
.device-type-management
  .category
    padding: 20px
    border: solid 1px #CCC
    margin-top: 10px

    .clickable-text
      margin-left: 15px

  .seperator-container
    text-align: center
    .seperator
      margin: auto
      display: inline-block
</style>

<template>
  <div class="product-preview main-content">
    <el-row class="product-block block-white ">
      <el-col :span="9" class="product-general-info">
        <div class="product-name">
          {{ currentProduct.name }}
        </div>
        <div class="product-tags">
          <el-tag v-for="(tag, index) in currentProduct.tags" :key="'product' + product.id + 'tag' + index" effect="dark">{{ tag }}</el-tag>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="product-IID-label product-label">
          产品ID
        </div>
        <div class="product-IID-value product-value">
          {{ currentProduct.pid }}
        </div>
      </el-col>
      <el-col :span="3">
        <div class="product-accesskey-label product-label">
          AccessKey
        </div>
        <el-popover placement="bottom" title="AccessKey" width="200" trigger="click">
          <div>
            {{ currentProduct.access_key || '无' }}
            <br>
            <el-button v-if="currentProduct.access_key" type="primary" size="mini" @click="copyToClipboard(currentProduct.access_key)">复制</el-button>
          </div>
          <div slot="reference" class="product-accesskey-value product-value clickable-text">
            查看
          </div>
        </el-popover>
      </el-col>
      <el-col :span="3">
        <div class="product-protocol-label product-label">
          设备接入协议
        </div>
        <div class="product-protocol-value product-value">
          {{ currentProduct.protocol_type }}
        </div>
      </el-col>
      <el-col :span="3">
        <div class="product-network-label product-label">
          联网方式
        </div>
        <div class="product-network-value product-value">
          {{ currentProduct.connection | connectionFilter }}
        </div>
      </el-col>
      <el-col v-if="currentProduct.device_node === 'CHILD'" :span="3">
        <div class="product-subdevice-biding-code-label product-label">
          子设备绑定码
        </div>
        <el-popover placement="bottom" title="AccessKey" width="200" trigger="click">
          <div>
            {{ currentProduct.access_code || '无' }}
            <br>
            <el-button v-if="currentProduct.access_code" type="primary" size="mini" @click="copyToClipboard(currentProduct.access_code)">复制</el-button>
          </div>
          <div slot="reference" class="product-subdevice-biding-code-value product-value clickable-text">
            查看
          </div>
        </el-popover>
      </el-col>
    </el-row>
    <el-row class="device-data-block block-white ">
      <el-col :span="6">
        <div class="device-data-label" style="border-left: solid 5px var(--default-link-color)">
          设备总数
        </div>
        <div class="device-data-value">
          {{ deviceData.total }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="device-data-label">
          在线设备数
        </div>
        <div class="device-data-value">
          {{ deviceData.live }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="device-data-label">
          今日活跃设备数
        </div>
        <div class="device-data-value">
          {{ deviceData.acticed }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="device-data-label">
          沉默设备数
        </div>
        <div class="device-data-value">
          {{ deviceData.silence }}
        </div>
      </el-col>
    </el-row>
    <el-row class="project-block block-white ">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <h3>项目分布</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="text-align: center">
            <doughnut-chart :chart-data="projectDoughnutData" style="max-height: 200px; max-width: 200px; margin: auto" />
          </el-col>
          <el-col :span="12">
            <div v-for="(project, index) in projectData" :key="'project' + index" class="project-data-row">
              <div class="project-data-color" :style="{backgroundColor: project.color}" />
              <div class="project-data-name">{{ project.name }}</div>
              <div class="project-data-value">{{ project.value }}</div>
              <div class="projece-data-percentage">{{ (project.value / totalValue * 100).toFixed(2) }}%</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="active-device-block block-white ">
      <el-col :span="24">
        <el-row class="block-title-row">
          <el-col :span="5">
            <h3>活跃设备数</h3>
          </el-col>
          <el-col :span="14">
            <el-date-picker
              v-model="activeDeviceDateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
            />
          </el-col>
          <el-col :span="5" class="text-right">
            <div class="line-chart-dot" />
            活跃设备数
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <line-chart v-if="activeDeviceDbDData.label !== undefined" :chart-data="activeDeviceDbDData" style="height: 300px; width: 100% position: relative;" />
            <h4 v-else>暂无数据</h4>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="active-device-block block-white ">
      <el-col :span="24">
        <el-row class="block-title-row">
          <el-col :span="5">
            <h3>沉默设备数</h3>
          </el-col>
          <el-col :span="14">
            <el-date-picker
              v-model="silentDeviceDateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
            />
          </el-col>
          <el-col :span="5" class="text-right">
            <div class="line-chart-dot" />
            沉默设备数
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <line-chart v-if="silentDeviceDbData.label !== undefined" :chart-data="silentDeviceDbData" style="height: 300px; width: 100% position: relative;" />
            <h4 v-else>暂无数据</h4>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getProjectData } from '~/assets/getters'
import { colors } from '~/assets/config'
import { dateComparer } from '~/assets/util'
import { getProductList, getDeviceData, getDeviceDbDData } from '~/assets/ajax'

export default {
  data() {
    return {
      product: {},
      deviceData: {},
      projectData: [],
      projectDoughnutData: {},
      originalActiveDeviceDbDData: {},
      originalSilentDeviceDbDData: {},
      activeDeviceDateRange: '',
      silentDeviceDateRange: '',
      totalValue: 0,
      currentProduct: null,
      productList: []
    }
  },
  computed: {
    activeDeviceDbDData() {
      return this.generateLineChartData(this.originalActiveDeviceDbDData.data, this.activeDeviceDateRange)
    },
    silentDeviceDbData() {
      return this.generateLineChartData(this.originalSilentDeviceDbDData.data, this.silentDeviceDateRange)
    }
  },
  created() {
    if (!this.checkProduct()) {
      return
    }
    this.getProductList()
    this.getDeviceData()
    this.getDeviceDbDData()
    this.activeDeviceDateRange = [
      new Date(new Date() - 29 * 24 * 60 * 60 * 1000),
      new Date()
    ]
    this.silentDeviceDateRange = [
      new Date(new Date() - 29 * 24 * 60 * 60 * 1000),
      new Date()
    ]
  },
  methods: {
    generateLineChartData(data, range) {
      if (!data) { return {} }
      let originalData = []
      for (let item in data.data) {
        originalData.push({
          date: new Date(item),
          value: data.data[item]
        })
      }
      let areaColor = '#AAD0FF'
      if (process.client) {
        let gradient = document.getElementById('hidden-secret').getContext('2d').createLinearGradient(0, 0, 0, 200)
        gradient.addColorStop(0, '#AAD0FF')
        gradient.addColorStop(1, '#FFFFFF')
        areaColor = gradient
      }
      let lineChartData = {
        datasets: [{
          fill: true,
          data: [],
          borderWidth: 0,
          backgroundColor: areaColor
        }],
        labels: []
      }
      for (let item of originalData) {
        if (range.length === 2 && (dateComparer(range[0], item.date) === '>' || dateComparer(range[1], item.date) === '<')) {
          continue
        }
        lineChartData.datasets[0].data.push(item.value)
        lineChartData.labels.push(String(item.date.getMonth() + 1) + '-' + String(item.date.getDate()))
      }
      return lineChartData
    },
    getProductList() {
      getProductList(this, 'productList')
    },
    async getDeviceData() {
      await getDeviceData(this, 'deviceData', { productId: this.currentProduct.pid })
      let project = this.deviceData.project
      let data = []
      for (let item in project) {
        data.push({
          name: item,
          value: project[item]
        })
      }
      data.sort((a, b) => b.value - a.value)
      let totalValue = 0
      let projectDoughnutData = {
        datasets: [{
          data: [],
          backgroundColor: colors['chart-colors'],
          weight: 10,
          borderWidth: 2
        }],
        labels: []
      }
      if (data.length > 5) {
        let _data = []
        let other = 0
        for (let index in data) {
          if (index < 4) {
            _data.push(data[index])
          } else {
            other += data[index].value
          }
        }
        _data.push({ name: '其他', value: other })
        data = _data
      }
      for (let index in data) {
        let item = data[index]
        projectDoughnutData.datasets[0].data.push(item.value)
        projectDoughnutData.labels.push(item.name)
        totalValue += item.value
        item.color = colors['chart-colors'][index]
      }
      this.projectDoughnutData = projectDoughnutData
      this.totalValue = totalValue
      this.projectData = data
    },
    getDeviceDbDData() {
      // TODO wait till api fixed
      getDeviceDbDData(this, 'originalActiveDeviceDbDData', { productId: this.currentProduct.pid, type: 'live' })
      getDeviceDbDData(this, 'originalSilentDeviceDbDData', { productId: this.currentProduct.pid, type: 'silence' })
    },
    copyToClipboard(text) {
      let input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      input.remove()
      this.$toast('已复制到剪切板！', {
        customCss: {
          'background-color': '#67C23A',
          color: '#fff'
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.product-preview
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

  .device-data-block
    .device-data-label
      porder-left: solid 5px transparent
      padding: 0 20px
      color: #666
    .device-data-value
      porder-left: solid 5px transparent
      padding: 0 20px
      font-size: 30px

  .project-data-row
    height: 20px
    width: 100%
    margin-top: 15px

    div
      display: inline-block
      vertical-align: middle
      margin-left: 20px

    .project-data-color
      height: 20px
      width: 20px
      border-radius: 100px

    .project-data-name
      width: 120px

    .project-data-value
      width: 150px
      font-weight: bold

    .projece-data-percentage
      color: #666

</style>

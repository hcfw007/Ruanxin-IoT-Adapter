<template>
  <div class="function-definition main-content">
    <el-row class="function-info-block block-white block-round">
      <el-col :span="4">
        <div class="function-info-label">
          基础功能点
        </div>
        <div class="function-info-value">
          110999
        </div>
      </el-col>
      <el-col :span="2">
        <div class="seperator" />
      </el-col>
      <el-col :span="4">
        <div class="function-info-label">
          组合功能点
        </div>
        <div class="function-info-value">
          20999
        </div>
      </el-col>
      <el-col :span="14" class="function-info-operators text-right">
        <el-button>导入功能点</el-button>
        <el-button>导出功能点</el-button>
        <el-button type="primary">下载SDK</el-button>
      </el-col>
    </el-row>
    <el-row class="device-function-block block-white block-round">
      <el-col :span="24">
        <el-tabs v-model="currentDeviceFunctionTab">
          <el-tab-pane label="基础功能点" name="basic-function">
            <el-row>
              <el-col :span="18">
                <span class="block-info-title">
                  设备功能
                </span>
                <span class="block-info-hint">
                  标准功能无法满足你的需求时，你可以添加自定义功能
                </span>
              </el-col>
              <el-col :span="6" class="text-right">
                <div class="add-function-button">
                  <div class="add-function-icon">+</div>
                  <div class="add-function-text">标准功能点</div>
                </div>
                <div class="add-function-button">
                  <div class="add-function-icon">+</div>
                  <div class="add-function-text">自定义功能点</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table :data="deviceFunctionList">
                  <el-table-column prop="id" label="功能ID" />
                  <el-table-column label="功能类型">
                    <template slot-scope="scope">
                      {{ scope.row.functionType | functionTypeFilter }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="functionName" label="功能点名称" />
                  <el-table-column prop="fieldName" label="字段名称" />
                  <el-table-column prop="dataType" label="数据类型" />
                  <el-table-column prop="dataDescription" label="数据值定义" />
                  <el-table-column label="传输类型">
                    <template slot-scope="scope">
                      {{ scope.row.transferType | transferTypeFilter }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <span class="clickable-text">编辑</span>
                    <span class="clickable-text">查看</span>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="组合功能点" name="combined-function" />
        </el-tabs>
      </el-col>
    </el-row>
    <el-row class="device-function-block block-white block-round">
      <el-col :span="24">
        <el-row>
          <el-col :span="18">
            <span class="block-info-title">
              设备功能
            </span>
            <span class="block-info-hint">
              标准功能无法满足你的需求时，你可以添加自定义功能
            </span>
          </el-col>
          <el-col :span="6" class="text-right">
            <div class="add-function-button">
              <div class="add-function-icon">+</div>
              <div class="add-function-text">标准功能点</div>
            </div>
            <div class="add-function-button">
              <div class="add-function-icon">+</div>
              <div class="add-function-text">自定义功能点</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="deviceFunctionList">
              <el-table-column prop="id" label="功能ID" />
              <el-table-column label="功能类型">
                <template slot-scope="scope">
                  {{ scope.row.functionType | functionTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column prop="functionName" label="功能点名称" />
              <el-table-column prop="fieldName" label="字段名称" />
              <el-table-column prop="dataType" label="数据类型" />
              <el-table-column prop="dataDescription" label="数据值定义" />
              <el-table-column label="传输类型">
                <template slot-scope="scope">
                  {{ scope.row.transferType | transferTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <span class="clickable-text">编辑</span>
                <span class="clickable-text">查看</span>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDeviceFunctionList, getSystemFunctionList } from '~/assets/getters'

export default {
  filters: {
    transferTypeFilter(value) {
      let str = ''
      for (let i = 0; i < value.length; i++) {
        if (i > 0) {
          str += '，'
        }
        if (value[i] === 'up') {
          str += '上报'
        }
        if (value[i] === 'down') {
          str += '下发'
        }
      }
      return str
    },
    functionTypeFilter(value) {
      if (value === 'standard') {
        return '标准'
      }
      if (value === 'custom') {
        return '自定义属性'
      }
      return '未知类型'
    }
  },
  data() {
    return {
      currentDeviceFunctionTab: 'basic-function',
      deviceFunctionList: [],
      systemFunctionList: []
    }
  },
  created() {
    this.getFunctionList()
  },
  methods: {
    getFunctionList() {
      getDeviceFunctionList().then((data) => {
        this.deviceFunctionList = data
      })
      getSystemFunctionList().then((data) => {
        this.systemFunctionList = data
      })
    }
  }
}
</script>

<style lang="stylus">
.function-definition
  .function-info-label
    color: #666
    font-size: 16px

  .function-info-value
    font-size: 30px
    margin-top: 10px

  .function-info-operators
    .el-button:not(:first-child)
      margin-left: 30px

  .add-function-button
    display: inline-block
    cursor: pointer

    &:not(:first-child)
      margin-left: 25px

    .add-function-icon
      color: var(--default-link-color)
      border: solid 1px var(--default-link-color)
      border-radius: 8px
      text-align: center
      height: 30px
      width: 30px
      line-height: 28px
      font-size: 24px
      font-weight: bold
      vertical-align: middle
      display: inline-block

    .add-function-text
      display: inline-block
      margin-left: 15px
</style>

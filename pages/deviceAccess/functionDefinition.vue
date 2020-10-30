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
      <el-col :span="14" class="function-info-operators">
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
                <span class="function-info-title">
                  设备功能
                </span>
                <span class="function-info hint">
                  标准功能无法满足你的需求时，你可以添加自定义功能
                </span>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="组合功能点" name="combined-function" />
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDeviceFunctionTab: 'basic-function'
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
    text-align: right
    .el-button:not(:first-child)
      margin-left: 30px
</style>

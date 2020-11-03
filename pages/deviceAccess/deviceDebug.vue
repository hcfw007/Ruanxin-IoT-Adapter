<template>
  <div class="device-debug main-content">
    <el-row class="block-white block-round">
      <el-col :span="12" class="debug-form">
        <el-form ref="debugForm" :model="form" label-width="120px">
          <el-form-item label="调试设备">
            <el-select v-model="form.deviceId" placeholder="请选择设备">
              <el-option label="设备1" value="id1" />
            </el-select>
          </el-form-item>
          <el-form-item label="消息类型">
            <el-radio-group v-model="form.messageType">
              <el-radio label="功能点下发" />
              <el-radio label="功能点查询" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="功能点">
            <el-select v-model="form.functionId" placeholder="请选择功能点">
              <el-option label="功能点1" value="id1" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            {{ functionData.functionName || '请先选择功能点' }}
          </el-form-item>
          <el-form-item label="功能点值">
            <el-input v-model="form.functionValue" type="textarea" />
          </el-form-item>
          <el-form-item label="发送设置">
            <el-select v-model="form.sendMethod" placeholder="请选择发送模式">
              <el-option label="单次发送" value="once" />
              <el-option label="循环发送" value="loop" />
            </el-select>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button type="primary">发送</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="message-log">
        <el-row>
          <el-col :span="12">
            <span class="message-log-title">消息日志</span>
          </el-col>
          <el-col :span="12" class="text-right">
            <span class="clickable-text">清屏</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="message-log-container">
            <div v-for="(log, index) in messageLogList" :key="'log' + index" class="message-block">
              <div class="message-timestamp">
                获取属性 {{ log.time }}
              </div>
              <div class="message-result">
                result: {{ log.result }}
              </div>
              <div class="message-message">
                message: {{ log.message }}
              </div>
              <div v-if="index < (messageLogList.length - 1)" class="message-seperator" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMessageLogList } from '~/assets/getters'

export default {
  data() {
    return {
      form: {
        functionValue: ''
      },
      functionData: {},
      messageLogList: []
    }
  },
  created() {
    this.getMessageLogList()
  },
  methods: {
    getMessageLogList() {
      getMessageLogList().then((data) => {
        this.messageLogList = data
      })
    }
  }
}
</script>

<style lang="stylus">
.device-debug
  .el-form-item__content
    width: 70%

  .el-select
    width: 100%

  .message-log-container
    border: solid 1px #AAA
    color: #999

    .message-block
      width: 100%
      padding: 15px

      div:not(:first-child)
        margin-top: 20px

    .message-seperator
      width: 100%
      height: 0
      border-top: solid 1px #AAA
</style>

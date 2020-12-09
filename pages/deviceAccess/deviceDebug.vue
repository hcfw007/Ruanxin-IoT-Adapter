<template>
  <div class="device-debug main-content">
    <el-row class="block-white block-round">
      <el-col :span="12" class="debug-form">
        <el-form ref="debugForm" :model="debugInfo" label-width="120px">
          <el-form-item label="调试设备">
            <el-select v-model="debugInfo.deviceId" filterable allow-create placeholder="请选择或输入设备" @change="updateFunctionList($event)">
              <el-option v-for="product in productList" :key="'product' + product.id" :label="product.name" :value="product.pid" />
            </el-select>
          </el-form-item>
          <el-form-item label="消息类型">
            <el-radio-group v-model="debugInfo.messageType" @change="handleMessageTypeChange">
              <el-radio label="down">功能点下发</el-radio>
              <el-radio label="up">功能点查询</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="功能点">
            <el-select v-model="debugInfo.function" placeholder="请选择功能点">
              <el-option v-for="fun in filteredFunctionList" :key="'fun' + fun.id" :label="fun.name" :value="fun.index" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            {{ getFunctionFromIndex(debugInfo.function).type | dataTypeFilter }}
          </el-form-item>
          <el-form-item label="功能点值">
            <el-input v-model="debugInfo.value" type="textarea" maxlength="255" placeholder="最多255个字符" show-word-limit />
          </el-form-item>
          <el-form-item label="发送设置">
            <el-select v-model="debugInfo.requestType" placeholder="请选择发送模式">
              <el-option label="单次发送" value="once" />
              <el-option label="循环发送" value="loop" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="debugInfo.requestType === 'loop'" label="发送间隔">
            <el-input v-model="debugInfo.requestInterval" type="number" placeholder="3-3600, 单位秒" min="3" max="3600" />
          </el-form-item>
          <el-form-item class="text-right">
            <el-button v-if="looping" type="primary" :loading="shakeproof" @click="stop">停止</el-button>
            <el-button v-else type="primary" :loading="shakeproof" @click="execute">发送</el-button>
            <el-button @click="reset">重置</el-button>
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
import { getProductList, getFullFunctionList, dispatchCommand } from '~/assets/ajax'

export default {
  data() {
    return {
      debugInfo: {
        deviceId: '',
        messageType: 'down',
        function: '',
        dataType: 'String',
        value: '',
        requestType: 'once',
        requestInterval: 3
      },
      productList: [],
      functionData: {},
      messageLogList: [],
      productFunctionList: {
        count: 0,
        functions: []
      },
      looping: false,
      shakeproof: false,
      interval: null
    }
  },
  computed: {
    filteredFunctionList() {
      return this.productFunctionList.functions.filter(ele => ele[this.debugInfo.messageType])
    }
  },
  created() {
    this.getMessageLogList()
    this.getProductList()
  },
  methods: {
    getProductList() {
      getProductList(this, 'productList')
    },
    getMessageLogList() {
      getMessageLogList().then((data) => {
        this.messageLogList = data
      })
    },
    updateFunctionList(pid) {
      this.productFunctionList = {
        count: 0,
        functions: []
      }
      this.debugInfo.function = ''
      getFullFunctionList(this, 'productFunctionList', null, { productPid: pid })
    },
    handleMessageTypeChange(val) {
      this.debugInfo.function = ''
    },
    getFunctionFromIndex(index) {
      for (let item of this.productFunctionList.functions) {
        if (item.index === index) { return item }
      }
      return {}
    },
    execute() {
      this.shakeproof = true
      setTimeout(() => {
        this.shakeproof = false
      }, 2000)
      let data = {
        deviceId: this.debugInfo.deviceId,
        function: this.debugInfo.function,
        command: this.debugInfo.value
      }
      if (this.debugInfo.requestType === 'loop') {
        this.interval = setInterval(() => {
          this.request(data)
        }, this.debugInfo.requestInterval * 1000)
        this.looping = true
      } else {
        this.request(data)
      }
    },
    request(data) {
      dispatchCommand(data).then((response) => {
        console.log(response)
      })
    },
    stop() {
      clearInterval(this.interval)
      this.looping = false
    },
    reset() {
      if (this.looping) {
        clearInterval(this.interval)
      }
      this.looping = false
      this.debugInfo = {
        deviceId: '',
        messageType: 'down',
        function: '',
        dataType: 'String',
        value: '',
        requestType: 'once',
        requestInterval: 3
      }
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

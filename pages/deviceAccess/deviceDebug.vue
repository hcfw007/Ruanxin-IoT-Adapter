<template>
  <div class="device-debug main-content">
    <el-row class="block-white ">
      <el-col :span="12" class="debug-form">
        <el-form ref="debugForm" :model="debugInfo" label-width="120px">
          <el-form-item label="调试设备">
            <el-select v-model="debugInfo.sensorId" filterable allow-create placeholder="请选择或输入设备编号" @change="handleDeviceChange($event)">
              <el-option v-for="device in deviceList.resultList" :key="'device' + device.sensorId" :label="device.sensorId" :value="device.sensorId" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="showIDInput" label="设备ID">
            <el-input v-model="debugInfo.deviceId" placeholder="手动输入的设备需要手动填写设备ID" />
          </el-form-item>
          <el-form-item label="消息类型">
            <el-radio-group v-model="debugInfo.messageType" @change="handleMessageTypeChange">
              <el-radio label="down">功能点下发</el-radio>
              <el-radio label="up">功能点查询</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="功能点">
            <el-select v-model="debugInfo.functionIndex" placeholder="请选择功能点" :loading="gettingFunction" @change="handleFunctionChange">
              <el-option v-for="fun in filteredFunctionList" :key="'fun' + fun.id" :label="fun.name" :value="fun.index" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型">
            {{ debugInfo.function.type | dataTypeFilter }}
          </el-form-item>
          <el-form-item v-if="debugInfo.messageType === 'down'" label="功能点值">
            <el-input
              v-model="debugInfo.value"
              type="textarea"
              maxlength="255"
              placeholder="最多255个字符，应符合JSON格式"
              show-word-limit
              :autosize="{ minRows: 5}"
            />
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
            <el-button v-if="looping" type="primary" :loading="shakeproof" class="stop-button" @click="stop">停止</el-button>
            <el-button v-else type="primary" :loading="shakeproof" class="execute-button" @click="execute">发送</el-button>
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
            <span class="clickable-text" @click="messageLogList = []">清屏</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="messageLogList.length > 0" :span="24" class="message-log-container">
            <div v-for="(log, index) in messageLogList" :key="'log' + index" class="message-block">
              <!-- <div class="message-timestamp">
                获取属性 {{ log.time }}
              </div> -->
              <div class="message-result">
                result: {{ log.result }}
              </div>
              <div class="message-message">
                message: {{ log.message }}
              </div>
              <div v-if="index < (messageLogList.length - 1)" class="message-seperator" />
            </div>
          </el-col>
          <el-col v-else :span="24">
            <h4>暂无数据</h4>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDeviceList, getFullFunctionList, dispatchCommand } from '~/assets/ajax'

export default {
  data() {
    return {
      debugInfo: {
        device: {},
        devicePid: '',
        sensorId: '',
        messageType: 'down',
        function: '',
        functionIndex: '',
        dataType: 'String',
        value: '',
        requestType: 'once',
        requestInterval: 3
      },
      deviceList: {
        resultList: []
      },
      functionData: {},
      messageLogList: [],
      productFunctionList: {
        count: 0,
        functions: []
      },
      looping: false,
      shakeproof: false,
      interval: null,
      gettingFunction: false,
      showIDInput: false
    }
  },
  computed: {
    filteredFunctionList() {
      return this.productFunctionList.functions.filter(ele => ele[this.debugInfo.messageType])
    }
  },
  created() {
    if (!this.checkProduct()) {
      return
    }
    this.getDeviceList()
    this.updateFunctionList(this.currentProduct.pid)
  },
  methods: {
    getDeviceList() {
      getDeviceList(this, 'deviceList', { productId: this.currentProduct.pid })
    },
    async updateFunctionList(pid) {
      this.gettingFunction = true
      this.productFunctionList = {
        count: 0,
        functions: []
      }
      this.debugInfo.function = ''
      await getFullFunctionList(this, 'productFunctionList', null, { productPid: pid })
      this.gettingFunction = false
    },
    handleMessageTypeChange(val) {
      this.debugInfo.function = ''
      this.debugInfo.functionIndex = ''
    },
    handleFunctionChange(val) {
      this.debugInfo.function = this.getFunctionFromIndex(val)
      let valueObj = []
      if (this.debugInfo.function.meta_type !== 'COMBINE') {
        valueObj.push({
          index: this.debugInfo.function.index,
          value: {
          }
        })
      } else {
        for (let item of this.debugInfo.function.combination) {
          valueObj.push({
            index: item.index,
            value: {
            }
          })
        }
      }
      this.debugInfo.value = JSON.stringify(valueObj, null, 2)
    },
    handleDeviceChange(val) {
      // let device = this.getDeviceFromPid(val)
      // if (device) {
      //   this.debugInfo.device = device
      //   this.debugInfo.deviceId = device.id
      // } else {
      //   this.showIDInput = true
      // }
      // this.updateFunctionList(device.pid)
    },
    getDeviceFromPid(pid) {
      for (let item of this.productList) {
        if (item.pid === pid) { return item }
      }
      return false
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
      let sn = this.debugInfo.sensorId
      let device = null
      for (let item of this.deviceList.resultList) {
        if (item.sensorId === sn) {
          device = item
        }
      }

      let data = {
        pid: this.currentProduct.pid,
        sn: device.sensorId,
        sensorType: device.sensorType
      }

      if (this.debugInfo.messageType === 'down') {
        try {
          let params = JSON.parse(this.debugInfo.value)
          data.params = params
        } catch (e) {
          console.debug(e.message)
          this.$toast('读取功能点值失败，请输入合法的JSON字符串', {
            customCss: {
              'background-color': '#E6A23C',
              color: '#fff'
            }
          })
          return
        }
      } else if (this.debugInfo.function.meta_type !== 'COMBINE') {
        data.params = {
          index: this.debugInfo.function.index
        }
      }

      if (this.debugInfo.function.meta_type === 'COMBINE') {
        data.group_id = this.debugInfo.function.index
      }
      if (this.debugInfo.requestType === 'loop') {
        this.interval = setInterval(() => {
          this.request(data, this.debugInfo.messageType)
        }, this.debugInfo.requestInterval * 1000)
        this.looping = true
      } else {
        this.request(data, this.debugInfo.messageType)
      }
    },
    request(data, type) {
      dispatchCommand(data, type).then((response) => {
        let log = {
          message: response.data.data.message,
          result: response.data.data.success ? '成功' : '失败'
        }
        this.messageLogList.push(log)
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

  .execute-button, .stop-button
    background-color: #3071a9
    border-color: #3071a9
</style>

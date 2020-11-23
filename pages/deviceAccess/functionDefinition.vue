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
                <div class="add-function-button" @click="addFunction()">
                  <div class="add-function-icon">+</div>
                  <div class="add-function-text">标准功能点</div>
                </div>
                <div class="add-function-button" @click="addCustomFunction()">
                  <div class="add-function-icon">+</div>
                  <div class="add-function-text">自定义功能点</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table :data="productFunctionList.functions">
                  <el-table-column prop="id" label="功能ID" />
                  <el-table-column label="功能类型">
                    <template slot-scope="scope">
                      {{ scope.row.fn_type | functionTypeFilter }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="功能点名称" />
                  <el-table-column prop="subject" label="字段名称" />
                  <el-table-column prop="type" label="数据类型" />
                  <el-table-column label="传输类型">
                    <template slot-scope="scope">
                      {{ transferTypeTransfer(scope.row.up, scope.row.down) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="clickable-text">编辑</span>
                      <el-popconfirm title="确定要删除吗？" @confirm="deleteFunction(scope.row.id)">
                        <span slot="reference" class="clickable-text">删除</span>
                      </el-popconfirm>
                    </template>
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
              系统功能
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
              <el-table-column label="功能点类型">
                <template slot-scope="scope">
                  1
                </template>
              </el-table-column>
              <el-table-column prop="functionName" label="功能点名称" />
              <el-table-column prop="fieldName" label="字段名称" />
              <el-table-column prop="dataType" label="数据类型" />
              <el-table-column prop="dataDescription" label="数据值定义" />
              <el-table-column label="传输类型">
                <template slot-scope="scope">
                  2
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
    <el-drawer
      title="添加产品"
      :visible.sync="addingFunction"
      direction="rtl"
      :modal="false"
      size="600"
    >
      <div class="drawer-content">
        <el-row>
          <el-col :span="24">
            <el-transfer v-model="addedFunctions" filterable :data="functionList.functions" :props="{key: 'id', label: 'name'}" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-right">
            <el-button type="primary" :loading="postingFunction" @click="saveFunctions()">添加</el-button>
            <el-button @click="addingFunction = false">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <el-drawer
      title="添加自定义功能点"
      :visible.sync="addingCustomFunction"
      direction="rtl"
      :modal="false"
    >
      <div class="drawer-content">
        <el-form :model="customFunction" label-width="120px">
          <el-form-item label="功能类型" required>
            <el-select v-model="customFunction.fn_type" placeholder="请选择功能类型">
              <el-option label="属性类型" value="COMMON" />
              <el-option label="事件类型" value="EVENT" />
            </el-select>
          </el-form-item>
          <el-form-item label="功能点名称" required>
            <el-input v-model="customFunction.name" placeholder="不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="字段名称" required>
            <el-input v-model="customFunction.subject" placeholder="支持字母、数字、下划线，以字母开头，不超过20个字符" maxlength="20" />
          </el-form-item>

          <section v-if="customFunction.fn_type === 'COMMON'">
            <el-form-item label="数据类型" required>
              <el-select v-model="customFunction.type" placeholder="请选择数据类型" @change="customFunctionTypeChangeHandler($event)">
                <el-option label="布尔型" value="BOOLEAN" />
                <el-option label="数值型" value="NUMBER" />
                <el-option label="枚举型" value="ENUM" />
                <el-option label="故障型" value="EXCEPTION" />
                <el-option label="字符串型" value="STRING" />
                <el-option label="透传型" value="BUFFER" />
              </el-select>
            </el-form-item>
            <section v-if="customFunction.type === 'BOOLEAN'" />
            <section v-if="customFunction.type === 'NUMBER'">
              <el-form-item label="取值范围" required>
                <el-col :span="11">
                  <el-input v-model="functionSpecFieldsByType.number.min" placeholder="最小值" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input v-model="functionSpecFieldsByType.number.max" placeholder="最大值" />
                </el-col>
              </el-form-item>
              <el-form-item label="间距" required>
                <el-input v-model="functionSpecFieldsByType.number.step" placeholder="请输入数据精度，如身高需要精确到0.1，则输入0.1" />
              </el-form-item>
              <el-form-item label="单位">
                <el-input v-model="functionSpecFieldsByType.number.unit" placeholder="请输入单位" />
              </el-form-item>
            </section>
            <section v-if="customFunction.type === 'ENUM'">
              <el-form-item label="枚举值" required>
                <enum-editor v-model="functionSpecFieldsByType.enum.items" />
              </el-form-item>
            </section>
            <section v-if="customFunction.type === 'EXCEPTION'">
              <el-form-item label="枚举值" required>
                <enum-editor v-model="functionSpecFieldsByType.exception.items" />
              </el-form-item>
            </section>
            <section v-if="customFunction.type === 'STRING'">
              <el-form-item label="最大长度">
                <span>最大长度不超过255字节</span>
              </el-form-item>
            </section>
            <section v-if="customFunction.type === 'BUFFER'">
              <el-form-item label="最大长度">
                <span>最大长度不超过255字节</span>
              </el-form-item>
            </section>
          </section>

          <section v-if="customFunction.fn_type === 'EVENT'">
            <el-form-item label="事件类型" required>
              <el-select v-model="customFunction.event_type" placeholder="请选择事件类型">
                <el-option label="信息型" value="INFO" />
                <el-option label="告警型" value="WARNING" />
                <el-option label="故障型" value="FAULT" />
              </el-select>
            </el-form-item>
            <el-form-item label="输出参数" required>
              <el-row v-for="(param, index) in customFunction.params" :key="'param' + String(index)" class="param-row">
                <el-col :span="18">
                  {{ param.name }}
                </el-col>
                <el-col :span="6" class="text-right">
                  <span class="clickable-text">编辑</span>
                  <span class="clickable-text" @click="customFunction.params.slice(index, 1)">删除</span>
                </el-col>
              </el-row>
              <el-row class="add-param-row">
                <span class="clickable-text" @click="addParam">
                  +添加输出参数
                </span>
              </el-row>
            </el-form-item>
          </section>

          <el-form-item label="传输类型" required>
            <el-select v-model="customFunctionTransferType" placeholder="请选择数据类型">
              <el-option v-if="customFunction.type !== 'EXCEPTION'" label="可下发可上报" value="up, down" />
              <el-option v-if="customFunction.type !== 'EXCEPTION' && customFunction.type !== 'BUFFER'" label="只可下发" value="down" />
              <el-option label="只可上报" value="up" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="customFunction.remark" type="textarea" maxlength="100" placeholder="最多100个字符" show-word-limit />
          </el-form-item>
          <el-divider />
          <el-form-item class="text-right">
            <el-button type="primary" :loading="postingCustomFunction" @click="saveCustomFunction()">添加</el-button>
            <el-button @click="addingCustomFunction = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      title="添加输出参数"
      :visible.sync="addingParam"
      direction="rtl"
      :modal="false"
    >
      <div class="drawer-content">
        <el-form :model="param" label-width="120px">
          <el-form-item label="参数名称" required>
            <el-input v-model="param.name" placeholder="不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="参数字段" required>
            <el-input v-model="param.subject" placeholder="支持字母、数字、下划线，以字母开头，不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="数据类型" required>
            <el-select v-model="param.type" placeholder="请选择数据类型" required>
              <el-option label="布尔型" value="BOOLEAN" />
              <el-option label="数值型" value="NUMBER" />
              <el-option label="枚举型" value="ENUM" />
              <el-option label="字符串型" value="STRING" />
            </el-select>
          </el-form-item>
          <section v-if="param.type === 'BOOLEAN'" />
          <section v-if="param.type === 'NUMBER'">
            <el-form-item label="取值范围" required>
              <el-col :span="11">
                <el-input v-model="param.number.min" placeholder="最小值" />
              </el-col>
              <el-col :span="2" class="text-center">-</el-col>
              <el-col :span="11">
                <el-input v-model="param.number.max" placeholder="最大值" />
              </el-col>
            </el-form-item>
            <el-form-item label="间距" required>
              <el-input v-model="param.number.step" placeholder="请输入数据精度，如身高需要精确到0.1，则输入0.1" />
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="param.number.unit" placeholder="请输入单位" />
            </el-form-item>
          </section>
          <section v-if="param.type === 'ENUM'">
            <el-form-item label="枚举值" required>
              <enum-editor v-model="param.enum.items" />
            </el-form-item>
          </section>
          <section v-if="param.type === 'STRING'">
            <el-form-item label="最大长度">
              <span>最大长度不超过255字节</span>
            </el-form-item>
          </section>
          <el-divider />
          <el-form-item class="text-right">
            <el-button type="primary" :loading="postingCustomFunction" @click="saveParam()">添加</el-button>
            <el-button @click="addingParam = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getDeviceFunctionList, getSystemFunctionList } from '~/assets/getters'
import { getProductFunctionList, getFunctionList, postProductFunctionList, deleteProductFunction, postProductCustomFunction } from '~/assets/ajax'
import { functionConfig } from '~/assets/config'

export default {
  filters: {
    functionTypeFilter(value) {
      if (value == null || value.length === 0) {
        return 'N/A'
      }
      if (value === 'COMMON') {
        return '属性类型'
      }
      if (value === 'EVENT') {
        return '事件类型'
      }
      return '未知类型'
    }
  },
  data() {
    return {
      customFunctionTransferType: 'up, down',
      addingFunction: false,
      addingCustomFunction: false,
      postingCustomFunction: false,
      postingFunction: false,
      addingParam: false,
      param: {
      },
      customFunction: {
        fn_type: 'COMMON'
      },
      functionSpecFieldsByType: {
        number: {
          min: 0,
          max: 100,
          step: 0.1,
          unit: ''
        },
        enum: {
          items: []
        },
        exception: {
          items: []
        }
      },
      addedFunctions: [],
      currentDeviceFunctionTab: 'basic-function',
      deviceFunctionList: [],
      systemFunctionList: [],
      functionList: {
        count: 0,
        functions: []
      },
      productFunctionList: {
        count: 0,
        functions: []
      },
      currentProduct: {}
    }
  },
  created() {
    this.checkProduct()
    this.getFunctionList()
    this.getProductFunctionList()
  },
  methods: {
    transferTypeTransfer(up, down) {
      if (up && down) {
        return '可上报可下发'
      }
      if (up) {
        return '只上报'
      }
      if (down) {
        return '只下发'
      }
      return '未知'
    },
    getProductFunctionList() {
      getProductFunctionList(this, 'productFunctionList', null, { id: this.currentProduct.id })
    },
    getFunctionList() {
      getFunctionList(this, 'functionList')
      getDeviceFunctionList().then((data) => {
        this.deviceFunctionList = data
      })
      getSystemFunctionList().then((data) => {
        this.systemFunctionList = data
      })
    },
    addParam() {
      // 点击添加参数
      // 初始化param
      let param = {
        name: '',
        type: 'BOOLEAN',
        subject: ''
      }
      param = Object.assign(param, functionConfig.functionSpecFieldsByTypeProto)
      param.exception = undefined // 参数没有故障型
      this.param = param
      // 显示drawer
      this.addingParam = true
    },
    saveParam() {
      let param = this.param
      this.customFunction.params.push(param)
      this.addingParam = false
    },
    addFunction() {
      // 点击添加标准功能点
      let functionList = this.productFunctionList.functions
      let functionIdList = []
      // 将已有功能点的id存入addedFunctions供穿梭框使用
      for (let item of functionList) {
        if (item.function_id) { functionIdList.push(item.function_id) }
      }
      this.addedFunctions = functionIdList
      // 展示添加标准功能点drawer
      this.addingFunction = true
    },
    addCustomFunction() {
      // 点击添加自定义功能点
      // 初始化自定义功能点数据结构
      this.customFunction = functionConfig.customFunctionProto
      this.functionSpecFieldsByType = functionConfig.functionSpecFieldsByTypeProto
      // 显示添加自定义功能点的drawer
      this.addingCustomFunction = true
    },
    async saveFunctions() {
      this.postingFunction = true

      // 获取产品id、功能点列表
      let productId = this.currentProduct.id
      let functionList = this.addedFunctions

      // 发送请求
      await postProductFunctionList(this, { function_ids: functionList }, '添加功能点成功！', '添加功能点失败', { id: productId })
      this.addingFunction = false
      this.postingFunction = false
      this.getProductFunctionList()
    },
    async deleteFunction(id) {
      await deleteProductFunction(this, null, '删除功能点成功！', '删除功能点失败', { id })
      this.getProductFunctionList()
    },
    async saveCustomFunction() {
      // 按钮载入动画
      this.postingCustomFunction = true
      // 获取产品id、功能点信息
      let customFunction = this.customFunction
      let productId = this.currentProduct.id

      // 获取特定数据类型的特殊信息
      let type = customFunction.type.toLowerCase()
      if (type in functionConfig.functionSpecFieldsByTypeProto) {
        customFunction[type] = this.functionSpecFieldsByType[type]
      }

      // 映射传输类型
      if (this.customFunctionTransferType.indexOf('up')) {
        customFunction.up = true
      } else {
        customFunction.up = false
      }
      if (this.customFunctionTransferType.indexOf('down')) {
        customFunction.down = true
      } else {
        customFunction.down = false
      }

      // 发送请求
      await postProductCustomFunction(this, customFunction, '添加功能点成功！', '添加功能点失败', { id: productId })

      // 关闭载入动画、drawer，拉取新列表
      this.addingCustomFunction = false
      this.postingCustomFunction = false
      this.getProductFunctionList()
    },
    customFunctionTypeChangeHandler(value) {
      // 故障型只能上传
      if (value === 'EXCEPTION') {
        this.customFunctionTransferType = 'up'
      }
      // 透传型不能只下发
      if (value === 'BUFFER' && this.customFunctionTransferType === 'down') {
        this.customFunctionTransferType = 'up, down'
      }
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

  .param-row
    background-color: #eee
    padding: 0 10px
    &:not(:first-child)
      margin-top: 5px !important
</style>

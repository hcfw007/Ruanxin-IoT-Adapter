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
        <el-button :loading="uploadingImportedFile" @click="chooseImportFile">导入功能点</el-button>
        <el-button @click="exportFunction">导出功能点</el-button>
        <el-button type="primary">下载SDK</el-button>
        <input id="import" type="file" style="display: none" accept="application/json" @change="handleImportUpload($event)">
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
                  <el-table-column prop="index" label="功能ID" />
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
                      <span class="clickable-text" @click="editFunction(scope.row)">编辑</span>
                      <el-popconfirm title="确定要删除吗？" @confirm="deleteFunction(scope.row.id)">
                        <span slot="reference" class="clickable-text">删除</span>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="组合功能点" name="combined-function">
            <el-row>
              <el-col :span="18">
                <span class="block-info-title">
                  组合功能点
                </span>
                <span class="block-info-hint">
                  可以将多个独立功能点组合，进行上报或者下发。
                </span>
              </el-col>
              <el-col :span="6" class="text-right">
                <div class="add-function-button" @click="addCombinedFunction()">
                  <div class="add-function-icon">+</div>
                  <div class="add-function-text">组合功能点</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table :data="combinedFunctionList.functions">
                  <el-table-column prop="index" label="功能ID" />
                  <el-table-column label="功能类型">
                    <template slot-scope="scope">
                      {{ scope.row.fn_type | functionTypeFilter }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="功能点名称" />
                  <el-table-column prop="subject" label="字段名称" />
                  <el-table-column label="传输类型">
                    <template slot-scope="scope">
                      {{ transferTypeTransfer(scope.row.up, scope.row.down) }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="clickable-text" @click="editCombinedFunction(scope.row)">编辑</span>
                      <el-popconfirm title="确定要删除吗？" @confirm="deleteFunction(scope.row.id, scope.row)">
                        <span slot="reference" class="clickable-text">删除</span>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- <el-row class="device-function-block block-white block-round">
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
    </el-row> -->
    <el-drawer
      title="添加标准功能点"
      :visible.sync="addingFunction"
      direction="rtl"
      size="600"
      :wrapper-closable="false"
    >
      <div class="drawer-content">
        <el-row>
          <el-col :span="24">
            <el-transfer v-model="addedFunctions" filterable :data="functionListFilteredByProductCategory" :props="{key: 'id', label: 'name'}" :titles="['功能点列表', '要添加的功能']" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-right">
            <el-button type="primary" :loading="postingFunction" @click="saveFunctions()">保存</el-button>
            <el-button @click="addingFunction = false">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <el-drawer
      :title="customFunctionDrawerMode + '自定义功能点'"
      :visible.sync="addingCustomFunction"
      direction="rtl"
      :wrapper-closable="false"
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
            <el-input v-model="customFunction.name" placeholder="不超过20个字符" maxlength="20" :disabled="customFunctionDrawerMode === '编辑'" />
          </el-form-item>
          <el-form-item label="字段名称" required>
            <el-input v-model="customFunction.subject" placeholder="支持字母、数字、下划线，以字母开头，不超过20个字符" maxlength="20" />
          </el-form-item>

          <section v-if="customFunction.fn_type === 'COMMON'">
            <el-form-item label="数据类型" required>
              <el-select v-model="customFunction.type" placeholder="请选择数据类型" @change="customFunctionTypeChangeHandler($event)">
                <el-option label="布尔型" value="BOOLEAN" />
                <el-option label="整数型" value="INTEGER" />
                <el-option label="浮点型" value="FLOAT" />
                <el-option label="枚举型" value="ENUM" />
                <el-option label="故障型" value="EXCEPTION" />
                <el-option label="字符串型" value="STRING" />
                <el-option label="透传型" value="BUFFER" />
              </el-select>
            </el-form-item>
            <section v-if="customFunction.type === 'BOOLEAN'" />
            <section v-if="customFunction.type === 'INTEGER' || customFunction.type === 'FLOAT'">
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
            <el-form-item label="传输类型" required>
              <el-select v-model="customFunctionTransferType" placeholder="请选择数据类型">
                <el-option v-if="customFunction.type !== 'EXCEPTION'" label="可下发可上报" value="up, down" />
                <el-option v-if="customFunction.type !== 'EXCEPTION' && customFunction.type !== 'BUFFER'" label="只可下发" value="down" />
                <el-option label="只可上报" value="up" />
              </el-select>
            </el-form-item>
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
                  <span class="clickable-text" @click="editParam(param)">编辑</span>
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

          <el-form-item label="备注">
            <el-input v-model="customFunction.remark" type="textarea" maxlength="100" placeholder="最多100个字符" show-word-limit />
          </el-form-item>
          <el-divider />
          <el-form-item class="text-right">
            <el-button type="primary" :loading="postingCustomFunction" @click="saveCustomFunction()">保存</el-button>
            <el-button @click="addingCustomFunction = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      :title="paramDrawerMode + '输出参数'"
      :visible.sync="addingParam"
      direction="rtl"
      :wrapper-closable="false"
    >
      <div class="drawer-content">
        <el-form :model="currentParam" label-width="120px">
          <el-form-item label="参数名称" required>
            <el-input v-model="currentParam.name" placeholder="不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="参数字段" required>
            <el-input v-model="currentParam.subject" placeholder="支持字母、数字、下划线，以字母开头，不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="数据类型" required>
            <el-select v-model="currentParam.type" placeholder="请选择数据类型" required>
              <el-option label="布尔型" value="BOOLEAN" />
              <el-option label="整数型" value="INTEGER" />
              <el-option label="浮点型" value="FLOAT" />
              <el-option label="枚举型" value="ENUM" />
              <el-option label="字符串型" value="STRING" />
            </el-select>
          </el-form-item>
          <section v-if="currentParam.type === 'BOOLEAN'" />
          <section v-if="currentParam.type === 'INTEGER' || currentParam.type === 'FLOAT'">
            <el-form-item label="取值范围" required>
              <el-col :span="11">
                <el-input v-model="currentParam.num_type.min" placeholder="最小值" />
              </el-col>
              <el-col :span="2" class="text-center">-</el-col>
              <el-col :span="11">
                <el-input v-model="currentParam.num_type.max" placeholder="最大值" />
              </el-col>
            </el-form-item>
            <el-form-item label="间距" required>
              <el-input v-model="currentParam.num_type.step" placeholder="请输入数据精度，如身高需要精确到0.1，则输入0.1" />
            </el-form-item>
            <el-form-item label="单位">
              <el-input v-model="currentParam.num_type.unit" placeholder="请输入单位" />
            </el-form-item>
          </section>
          <section v-if="currentParam.type === 'ENUM'">
            <el-form-item label="枚举值" required>
              <enum-editor v-model="currentParam.enum_type.items" />
            </el-form-item>
          </section>
          <section v-if="currentParam.type === 'STRING'">
            <el-form-item label="最大长度">
              <span>最大长度不超过255字节</span>
            </el-form-item>
          </section>
          <el-divider />
          <el-form-item class="text-right">
            <el-button type="primary" :loading="postingCustomFunction" @click="saveParam()">保存</el-button>
            <el-button @click="addingParam = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      :title="combinedFunctionDrawerMode + '组合功能点'"
      :visible.sync="addingCombinedFunction"
      direction="rtl"
      size="600"
      :wrapper-closable="false"
    >
      <div class="drawer-content">
        <el-form ref="combinedFunctionForm" :model="combinedFunction" label-width="120px" :rules="functionRules.combinedFunctionRule">
          <el-form-item label="功能点名称" prop="name">
            <el-input v-model="combinedFunction.name" placeholder="不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="字段名称" prop="subject">
            <el-input v-model="combinedFunction.subject" placeholder="支持字母、数字、下划线，以字母开头，不超过20个字符" maxlength="20" />
          </el-form-item>
          <el-form-item label="功能类型" required>
            <el-select v-model="combinedFunction.fn_type" placeholder="请选择功能类型">
              <el-option label="属性类型" value="COMMON" />
              <el-option label="事件类型" value="EVENT" />
            </el-select>
          </el-form-item>
          <el-form-item label="传输类型" required>
            <el-select v-model="combinedFunctionTransferType" placeholder="请选择数据类型" @change="combinedFunction.combination = []">
              <el-option label="可下发可上报" value="up, down" />
              <el-option label="只可下发" value="down" />
              <el-option label="只可上报" value="up" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="24">
            <el-transfer v-model="combinedFunction.combination" filterable :data="functionListFilteredByCombinedTransferType" :props="{key: 'index', label: 'name'}" :titles="['独立功能点', '组合功能点']" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-right">
            <el-button type="primary" :loading="postingCombinedFunction" @click="saveCombinedFunction()">保存</el-button>
            <el-button @click="addingCombinedFunction = false">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getDeviceFunctionList, getSystemFunctionList } from '~/assets/getters'
import { getProductFunctionList, getFunctionList, postProductFunctionList, deleteProductFunction, postProductCustomFunction, editProductFunction, getCombinedFunctionList, postCombinedFunction, exportFunction, importFunction, editCombinedFunction } from '~/assets/ajax'
import { functionConfig, functionRules } from '~/assets/config'

const basicDeepCopy = obj => JSON.parse(JSON.stringify(obj))

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
      combinedFunctionTransferType: 'up, down',
      addingFunction: false,
      addingCustomFunction: false,
      addingCombinedFunction: false,
      combinedFunction: {},
      postingCustomFunction: false,
      postingCombinedFunction: false,
      postingFunction: false,
      addingParam: false,
      uploadingImportedFile: false,
      currentParam: {
      },
      customFunction: {
        fn_type: 'COMMON'
      },
      functionSpecFieldsByType: basicDeepCopy(functionConfig.functionSpecFieldsByTypeProto),
      addedFunctions: [],
      currentDeviceFunctionTab: 'basic-function',
      deviceFunctionList: [],
      systemFunctionList: [],
      combinedFunctionList: {
        count: 0,
        functions: []
      },
      functionList: {
        count: 0,
        functions: []
      },
      productFunctionList: {
        count: 0,
        functions: []
      },
      currentProduct: {},
      customFunctionDrawerMode: '添加',
      paramDrawerMode: '添加',
      combinedFunctionDrawerMode: '添加',
      functionRules
      // functionListFilteredByCombinedTransferType: []
    }
  },
  computed: {
    functionListFilteredByCombinedTransferType() {
      let [up, down] = [false, false]
      if (this.combinedFunctionTransferType.includes('up')) {
        up = true
      }
      if (this.combinedFunctionTransferType.includes('down')) {
        down = true
      }
      return this.productFunctionList.functions.filter(ele => ((ele.up === up && ele.down === down) || (ele.up && ele.down)))
    },
    functionListFilteredByProductCategory() {
      let categoryId = this.currentProduct.category_id
      return this.functionList.functions.filter(ele => ele.category_id === categoryId)
    }
  },
  created() {
    this.checkProduct()
    this.getFunctionList()
    this.getProductFunctionList()
  },
  methods: {
    exportFunction() {
      let pid = this.currentProduct.pid
      exportFunction(pid).catch((err) => {
        this.$toast('导出失败，消息为' + err.msg, {
          customCss: {
            'background-color': '#E6A23C',
            color: '#fff'
          }
        })
      })
    },
    chooseImportFile() {
      document.getElementById('import').click()
    },
    async handleImportUpload(event) {
      this.uploadingImportedFile = true
      let pid = this.currentProduct.pid
      let file = event.target.files[0]
      let data = new FormData()
      data.append('file', file)
      await importFunction(data).then((response) => {
        let data = response.data
        if (data.code === 200) {
          this.$toast('导入成功', {
            customCss: {
              'background-color': '#67C23A',
              color: '#fff'
            }
          })
          this.getProductFunctionList()
        } else {
          this.$toast('导入失败， 消息为：' + data.msg, {
            customCss: {
              'background-color': '#E6A23C',
              color: '#fff'
            }
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$toast('导入失败', {
          customCss: {
            'background-color': '#E6A23C',
            color: '#fff'
          }
        })
      })
      this.uploadingImportedFile = false
    },
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
    addCombinedFunction() {
      // 添加组合功能点
      let combinedFunction = Object.assign({}, functionConfig.combinedFunctionProto)
      this.combinedFunction = combinedFunction
      this.combinedFunctionDrawerMode = '添加'
      this.addingCombinedFunction = true
    },
    editCombinedFunction(row) {
      // 编辑组合功能点
      let fun = Object.assign({}, row)
      let transferType
      if (fun.up && fun.down) {
        transferType = 'up, down'
      } else if (fun.up) {
        transferType = 'up'
      } else {
        transferType = 'down'
      }
      let combinations = []
      for (let item of row.combination) {
        combinations.push(item.index)
      }

      // 写入功能点内容
      fun.combination = combinations
      this.combinedFunctionTransferType = transferType
      this.combinedFunction = fun

      this.combinedFunctionDrawerMode = '编辑'
      this.addingCombinedFunction = true
    },
    editFunction(row) {
      // 编辑功能点（无论是自定义还是标准）
      let fun = Object.assign({}, row)
      let transferType
      if (fun.up && fun.down) {
        transferType = 'up, down'
      } else if (fun.up) {
        transferType = 'up'
      } else {
        transferType = 'down'
      }
      // 写入功能点内容
      this.customFunctionTransferType = transferType
      this.customFunction = fun
      // 写入特定类型的数据
      let type = row.type.toLowerCase()
      if (type in functionConfig.functionSpecFieldsByTypeProto) {
        let _type = type
        if (_type === 'enum') { _type = 'enum_value' }
        this.functionSpecFieldsByType[type] = basicDeepCopy(row[_type])
      }
      // 修改并展示drawer
      this.customFunctionDrawerMode = '编辑'
      this.addingCustomFunction = true
    },
    getProductFunctionList() {
      getProductFunctionList(this, 'productFunctionList', null, { productPid: this.currentProduct.pid })
      getCombinedFunctionList(this, 'combinedFunctionList', null, { productPid: this.currentProduct.pid })
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
      param = basicDeepCopy(functionConfig.paramProto)
      this.currentParam = param
      // 显示drawer
      this.paramDrawerMode = '添加'
      this.addingParam = true
    },
    editParam(param) {
      // 编辑参数
      this.currentParam = param
      for (let item in functionConfig.paramProto) {
        if (!param[item]) {
          param[item] = basicDeepCopy(functionConfig.paramProto[item])
        }
      }
      this.paramDrawerMode = '编辑'
      this.addingParam = true
    },
    saveParam() {
      // 如果是编辑，直接关闭窗口返回即可，因为直接编辑的是param对象
      if (this.paramDrawerMode === '编辑') {
        this.addingParam = false
        return
      }
      let param = this.currentParam
      if (!this.customFunction.params) { this.customFunction.params = [] }
      this.customFunction.params.push(param)
      this.addingParam = false
    },
    addFunction() {
      // 点击添加标准功能点
      // let functionList = this.productFunctionList.functions
      let functionIdList = []
      // 将已有功能点的id存入addedFunctions供穿梭框使用
      // 根据设计，尽管是用穿梭框实现，但添加标准功能点只承担添加作用，不能删除编辑。因此无需载入已有的功能点。
      // for (let item of functionList) {
      //   if (item.function_id) { functionIdList.push(item.function_id) }
      // }
      this.addedFunctions = functionIdList
      // 展示添加标准功能点drawer
      this.addingFunction = true
    },
    addCustomFunction() {
      // 点击添加自定义功能点
      // 初始化自定义功能点数据结构
      this.customFunction = Object.assign({}, functionConfig.customFunctionProto)
      this.functionSpecFieldsByType = basicDeepCopy(functionConfig.functionSpecFieldsByTypeProto)
      // 显示添加自定义功能点的drawer
      this.customFunctionDrawerMode = '添加'
      this.addingCustomFunction = true
    },
    async saveFunctions() {
      this.postingFunction = true

      // 获取功能点列表
      let functionList = this.addedFunctions

      // 发送请求
      await postProductFunctionList(this, { function_ids: functionList }, '添加功能点成功！', '添加功能点失败', { productPid: this.currentProduct.pid })
      this.addingFunction = false
      this.postingFunction = false
      this.getProductFunctionList()
    },
    async deleteFunction(id) {
      await deleteProductFunction(this, null, '删除功能点成功！', '删除功能点失败', { combinationId: id })
      this.getProductFunctionList()
    },
    async saveCustomFunction() {
      // 按钮载入动画
      this.postingCustomFunction = true
      // 获取功能点信息
      let customFunction = {}
      for (let item in functionConfig.customFunctionProto) {
        if (item in this.customFunction) {
          customFunction[item] = this.customFunction[item]
        }
      }

      // 获取特定数据类型的特殊信息
      let type = customFunction.type.toLowerCase()
      if (type === 'integer' || type === 'float') { type = 'number' } // number 细分
      let _type = type
      if (_type === 'enum') { _type = 'enum_value' } // “enum和java关键字冲突” said wang quan
      if (type in functionConfig.functionSpecFieldsByTypeProto) {
        customFunction[_type] = this.functionSpecFieldsByType[type]
      }

      // 映射传输类型
      if (this.customFunctionTransferType.includes('up')) {
        customFunction.up = true
      } else {
        customFunction.up = false
      }
      if (this.customFunctionTransferType.includes('down')) {
        customFunction.down = true
      } else {
        customFunction.down = false
      }
      // 事件类型只可上报
      if (customFunction.fn_type === 'EVENT') {
        customFunction.up = true
        customFunction.down = false
      }
      let result
      // 判断编辑还是新增，并发送请求
      if (this.customFunctionDrawerMode === '编辑') {
        customFunction.id = this.customFunction.id
        result = await editProductFunction(this, customFunction, '编辑功能点成功！', '编辑功能点失败', { productPid: this.currentProduct.pid, combinationId: this.customFunction.id })
      } else {
        result = await postProductCustomFunction(this, customFunction, '添加功能点成功！', '添加功能点失败', { productPid: this.currentProduct.pid })
      }

      // 关闭载入动画、drawer，拉取新列表
      // 失败就不关闭drawer
      if (result) { this.addingCustomFunction = false }
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
    },
    async saveCombinedFunction() {
      // 表单校验
      let pass = true
      await this.$refs.combinedFunctionForm.validate((valid) => {
        pass = valid
      })
      if (!pass) { return }
      // 按钮载入动画
      this.postingCombinedFunction = true
      // 获取功能点信息
      let combinedFunction = {}
      for (let item in functionConfig.combinedFunctionProto) {
        if (item in this.combinedFunction) {
          combinedFunction[item] = this.combinedFunction[item]
        }
      }

      // 产品id
      combinedFunction.product_id = this.currentProduct.pid

      // 映射传输类型
      combinedFunction.type = 'None'
      if (this.combinedFunctionTransferType.includes('up')) {
        combinedFunction.type = 'UP'
      }
      if (this.combinedFunctionTransferType.includes('down')) {
        if (combinedFunction.type === 'UP') {
          combinedFunction.type = 'BOTH'
        } else {
          combinedFunction.type = 'DOWN'
        }
      }

      // 添加组合信息（根据index获取功能点）
      let combination = []
      for (let item of this.combinedFunction.combination) {
        for (let fn of this.functionListFilteredByCombinedTransferType) {
          if (fn.index === item) {
            combination.push({
              id: fn.id,
              index: fn.index,
              subject: fn.subject,
              type: fn.type,
              up: fn.up,
              down: fn.down,
              name: fn.name
            })
            break
          }
        }
      }
      combinedFunction.combination = combination

      let result
      if (this.combinedFunctionDrawerMode === '编辑') {
        result = await editCombinedFunction(this, combinedFunction, '编辑组合功能点成功！', '编辑组合功能点失败', { combinationId: this.combinedFunction.id, pid: this.currentProduct.pid })
      } else {
        result = await postCombinedFunction(this, combinedFunction, '添加组合功能点成功！', '添加组合功能点失败', { id: this.currentProduct.pid })
      }
      // 关闭载入动画、drawer，拉取新列表
      // 失败就不关闭drawer
      if (result) { this.addingCombinedFunction = false }
      this.postingCombinedFunction = false
      this.getProductFunctionList()
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

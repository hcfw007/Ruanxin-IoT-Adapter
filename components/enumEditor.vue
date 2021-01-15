<template>
  <div class="emun-editor">
    <section v-if="type === 'enum'">
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="keyInput"
            :placeholder="`${ typeLabel }标识(Key)`"
            class="emun-input"
            :class="{'error': error}"
            @focus="error = false"
          />
          <div v-if="error" class="el-form-item__error">{{ errorMessage }}</div>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-input
            v-model="valueInput"
            :placeholder="`${ typeLabel }值(Value)`"
            class="emun-input"
            :class="{'error': error}"
            @focus="error = false"
          />
        </el-col>
        <el-col :span="7" style="text-align: right">
          <span class="add-emun" @click="addEmun">+ 添加{{ typeLabel }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="emun-item-container">
          <div v-for="(item, index) in value" :key="'emun-item' + String(index)" class="emun-item" @click="removeEmun(index)">
            {{ item.key }} - {{ item.value }} ×
          </div>
        </el-col>
      </el-row>
    </section>
    <section v-else>
      <el-row>
        <el-col :span="16">
          <el-input
            v-model="input"
            :placeholder="`请输入${ typeLabel }`"
            class="emun-input"
            :class="{'error': error}"
            @focus="error = false"
          />
          <div v-if="error" class="el-form-item__error">{{ errorMessage }}</div>
        </el-col>
        <el-col :span="8" style="text-align: right">
          <span class="add-emun" @click="addNoKeyEmun">+ 添加{{ typeLabel }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="emun-item-container">
          <div v-for="(item, index) in value" :key="'emun-item' + String(index)" class="emun-item" @click="removeEmun(index)">
            {{ item }} ×
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    typeLabel: {
      type: String,
      default: '枚举'
    },
    type: {
      type: String,
      default: 'enum'
    }
  },
  data() {
    return {
      input: '',
      keyInput: '',
      valueInput: '',
      errorMessage: '',
      currentArray: [],
      error: false
      // items: []
    }
  },
  watch: {
    value() {
      // 当外部调用的数组发生变化时，要重新初始化组件。
      if (this.value !== this.currentArray) {
        this.keyInput = ''
        this.valueInput = ''
        this.input = ''
        this.currentArray = this.value
      }
    }
  },
  methods: {
    addNoKeyEmun() {
      this.validateNoKeyInput(this.input)
      if (this.error) { return }
      this.value.push(this.input)
      this.input = ''
    },
    validateNoKeyInput(val) {
      if (this.input.length === 0) {
        this.error = true
        this.errorMessage = '添加内容为空，请输入'
        return true
      }
      if (this.value.includes(val)) {
        this.error = true
        this.errorMessage = '添加重复内容，请检查'
        return true
      }
      return false
    },
    addEmun() {
      this.validateInput()
      if (this.error) { return }
      this.value.push({
        key: this.keyInput,
        value: this.valueInput
      })
      this.keyInput = ''
      this.valueInput = ''
    },
    removeEmun(index) {
      this.value.splice(index, 1)
    },
    validateInput() {
      if (this.keyInput.length === 0 || this.valueInput.length === 0) {
        this.error = true
        this.errorMessage = '添加内容为空，请输入'
        return true
      }
      if (!/^[0-9]+$/.test(this.keyInput)) {
        this.error = true
        this.errorMessage = 'Key只能为整数，请检查'
        return true
      }
      for (let item of this.value) {
        if (item.key === this.keyInput) {
          this.error = true
          this.errorMessage = '添加重复Key，请检查'
          return true
        }
        if (item.value === this.valueInput) {
          this.error = true
          this.errorMessage = '添加重复Value，请检查'
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="stylus">
.emun-editor
  .add-emun
    color: #409eff
    cursor: pointer

  .emun-item-container
    display: flex
    flex-direction: row
    flex-wrap: wrap

    .emun-item
      margin: 0 5px
      color: #fff
      background-color: #409eff
      padding: 5px 10px
      line-height: 20px
      border-radius: 10px
      cursor: pointer

  .error>input
    border-color: red
</style>

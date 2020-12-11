<template>
  <div class="emun-editor">
    <el-row>
      <el-col :span="16">
        <el-input
          v-model="input"
          :placeholder="`请输入${ typeLabel }`"
          class="emun-input"
          :class="{'error': error}"
          @change="validateInput"
          @focus="error = false"
        />
        <div v-if="error" class="el-form-item__error">{{ errorMessage }}</div>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <span class="add-emun" @click="addEmun">+ 添加{{ typeLabel }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="emun-item-container">
        <div v-for="(item, index) in value" :key="'emun-item' + String(index)" class="emun-item" @click="removeEmun(index)">
          {{ item }} ×
        </div>
      </el-col>
    </el-row>
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
      default: '枚举值'
    }
  },
  data() {
    return {
      input: '',
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
        this.input = ''
        this.error = false
        this.currentArray = this.value
      }
    }
  },
  methods: {
    addEmun() {
      this.validateInput(this.input)
      if (this.error) { return }
      this.value.push(this.input)
      this.input = ''
    },
    removeEmun(index) {
      this.value.splice(index, 1)
    },
    validateInput(val) {
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

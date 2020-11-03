<template>
  <div class="device-list main-content">
    <el-row class="block-white block-round">
      <el-col :span="24">
        <el-row>
          <el-col :span="12">
            <span class="block-info-title">
              设备列表
            </span>
            <span class="block-info-hint">
              设备类型：网关设备
            </span>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary">添加设备</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-input v-model="searchInput" placeholder="请输入内容" class="input-with-select">
              <el-select slot="prepend" v-model="searchType" placeholder="请选择">
                <el-option label="完整设备" value="1" />
              </el-select>
              <el-button slot="append">搜索</el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="block-white block-round">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <span class="filter-label">创建时间</span>
            <el-date-picker
              v-model="createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <span class="filter-label">激活时间</span>
            <el-date-picker
              v-model="activateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-select v-model="onlineStatus" placeholder="选择在线状态">
              <el-option label="全部在线状态" value="all" />
            </el-select>
            <el-select v-model="activateStatus" placeholder="选择激活状态">
              <el-option label="全部激活状态" value="all" />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-right device-control">
            <span class="clickable-text gray">
              <i class="el-icon-folder-checked" />
              划拨到项目
            </span>
            <span class="clickable-text gray">
              <i class="el-icon-folder-delete" />
              批量删除
            </span>
            <span class="clickable-text gray">
              <i class="el-icon-box" />
              导出设备信息
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              ref="deviceListTable"
              :data="deviceList"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="设备标识后缀" prop="identifier" />
              <el-table-column label="设备名称" prop="name" />
              <el-table-column label="在线状态">
                <template slot-scope="scope">
                  <div :class="{'positive': scope.row.onlineStatus === 'online', 'negative': scope.row.onlineStatus === 'offline'}" class="indicator">
                    <div class="dot" />
                    {{ scope.row.onlineStatus | onlineStatusFilter }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="激活状态">
                <template slot-scope="scope">
                  <div :class="{'positive': scope.row.activateStatus === 'activated', 'negative': scope.row.activateStatus === 'deactivated'}" class="indicator">
                    <div class="dot" />
                    {{ scope.row.activateStatus | activateStatusFilter }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">{{ scope.row.createTime | dateTimeFilter }}</template>
              </el-table-column>
              <el-table-column label="激活时间">
                <template slot-scope="scope">{{ scope.row.activateTime | dateTimeFilter }}</template>
              </el-table-column>
              <el-table-column label="启用状态">
                <template slot-scope="scope">
                  <div :class="{'positive': scope.row.usageStatus === 'in-use', 'negative': scope.row.usageStatus === 'disabled'}" class="indicator">
                    <div class="dot" />
                    {{ scope.row.usageStatus | usageStatusFilter }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span class="clickable-text" :class="{'disabled': scope.row.usageStatus === 'in-use'}">
                    启用
                  </span>
                  <span class="clickable-text">
                    详情
                  </span>
                  <span class="clickable-text">
                    历史数据
                  </span>
                  <span class="clickable-text">
                    删除
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDeviceList } from '~/assets/getters'

export default {
  filters: {
    onlineStatusFilter(val) {
      if (val === 'online') {
        return '在线'
      }
      if (val === 'offline') {
        return '离线'
      }
      return 'N/A'
    },
    activateStatusFilter(val) {
      if (val === 'activated') {
        return '已激活'
      }
      if (val === 'deactivated') {
        return '未激活'
      }
      return 'N/A'
    },
    usageStatusFilter(val) {
      if (val === 'in-use') {
        return '已启用'
      }
      if (val === 'disabled') {
        return '已禁用'
      }
      return 'N/A'
    }
  },
  data() {
    return {
      searchInput: '',
      searchType: '',
      createTime: '',
      activateTime: '',
      onlineStatus: '',
      activateStatus: '',
      deviceList: []
    }
  },
  created() {
    this.getDeviceList()
  },
  methods: {
    getDeviceList() {
      getDeviceList().then((data) => {
        this.deviceList = data
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/deviceInfo/style.stylus'

.device-list
  .el-select .el-input
    width: 130px

  .el-input-group__prepend
    background-color: transparent !important

  .el-input-group__append
    background-color: var(--default-link-color) !important

    .el-button
      color: #fff

  .filter-label
    margin-right: 15px

    &:not(:first-child)
      margin-left: 30px

  .device-control
    span
      margin-left: 20px

    i
      margin-right: 10px

</style>

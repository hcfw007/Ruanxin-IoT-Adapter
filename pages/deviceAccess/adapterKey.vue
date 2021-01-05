<template>
  <div class="adapter-key main-content">
    <el-row class=" block-white">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <span class="block-info-title">
              适配器实例列表
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-input v-model="filterInput" placeholder="请输入内容" class="search-with-select">
              <el-select slot="prepend" v-model="filterType" placeholder="请选择过滤项目">
                <el-option label="实例名称" value="instanceName" />
                <el-option label="实例ID" value="instanceId" />
                <el-option label="适配器名称" value="adapterName" />
                <el-option label="产品名称" value="productName" />
                <el-option label="SDK名称" value="SDKName" />
              </el-select>
              <el-button slot="append" type="primary">搜索</el-button>
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="statusFilter" placeholder="请选择状态">
              <el-option label="状态（全部）" value="all" />
              <el-option label="连接" value="connected" />
              <el-option label="断开" value="disconnected" />
            </el-select>
          </el-col>
          <el-col :span="8" class="text-right">
            <el-button type="primary">导出实例列表</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              ref="instanceListTable"
              :data="instanceList"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="实例ID" prop="instanceId" />
              <el-table-column label="实例名称" prop="instanceName" />
              <el-table-column label="适配器名称" prop="adapterName" />
              <el-table-column label="产品名称" prop="productName" />
              <el-table-column label="设备数量" prop="deviceCount" />
              <el-table-column label="SDK名称" prop="SDKName" />
              <el-table-column label="部署IP" prop="IP" />
              <el-table-column label="注册时间" width="200">
                <template slot-scope="scope">{{ scope.row.registerTime | dateTimeFilter }}</template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <div :class="{'positive': scope.row.connectionStatus === 'connected', 'negative': scope.row.connectionStatus === 'disconnected'}" class="indicator">
                    <div class="dot" />
                    {{ scope.row.connectionStatus | connectionStatusFilter }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span class="clickable-text">
                    详情
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
import { getInstanceList } from '~/assets/getters'

export default {
  data() {
    return {
      filterInput: '',
      filterType: '',
      statusFilter: 'all',
      instanceList: []
    }
  },
  created() {
    this.getInstanceList()
  },
  methods: {
    getInstanceList() {
      getInstanceList().then((data) => {
        this.instanceList = data
      })
    }
  }
}
</script>

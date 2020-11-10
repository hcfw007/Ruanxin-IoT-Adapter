<template>
  <div class="device-detail main-content">
    <el-row class="block-white block-round">
      <el-col :span="24">
        <el-row>
          <el-col :span="24">
            <span class="block-info-title">
              设备标识：{{ deviceDetail.identifier }}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="device-info-container">
            <div class="device-info">
              产品名称：{{ deviceDetail.name }}
            </div>
            <div class="device-info">
              产品ID：{{ deviceDetail.id }}
            </div>
            <div class="device-info">
              设备名称：{{ deviceDetail.productName }}
            </div>
            <div class="device-info">
              设备Key：{{ deviceDetail.key }}
              <span class="clickable-text">
                复制
              </span>
            </div>
            <div class="device-info">
              子设备数：{{ deviceDetail.subDeviceNum }}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="block-white block-round">
      <el-col :span="24">
        <el-tabs v-model="currentDeviceInfoTab">
          <el-tab-pane label="设备信息" name="device-basic-info">
            <el-row>
              <el-col :span="24">
                <span class="block-info-title">
                  设备信息
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="device-info-container">
                <div class="device-info">
                  设备标识：{{ deviceDetail.identifier }}
                </div>
                <div class="device-info">
                  固件版本：{{ deviceDetail.firmwareVersion }}
                </div>
                <div class="device-info">
                  软件版本：{{ deviceDetail.softwareVersion }}
                </div>
                <div class="device-info">
                  <div :class="{'positive': deviceDetail.onlineStatus === 'online', 'negative': deviceDetail.onlineStatus === 'offline'}" class="indicator">
                    在线状态：
                    <div class="dot" />
                    {{ deviceDetail.onlineStatus | onlineStatusFilter }}
                  </div>
                </div>
                <div class="device-info">
                  <div :class="{'positive': deviceDetail.activateStatus === 'activated', 'negative': deviceDetail.activateStatus === 'deactivated'}" class="indicator">
                    激活状态：
                    <div class="dot" />
                    {{ deviceDetail.activateStatus | activateStatusFilter }}
                  </div>
                </div>
                <div class="device-info" />
                <div class="device-info">
                  创建时间：{{ deviceDetail.createTime | dateTimeFilter }}
                </div>
                <div class="device-info">
                  激活时间：{{ deviceDetail.activateTime | dateTimeFilter }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="device-location">
                  设备位置：{{ locationInfo }}
                </div>
              </el-col>
              <el-col :span="12" class="text-right">
                <el-button class="btn-transparent">更新位置</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <baidu-map class="map" ak="RT5aKMh66gEXwCnjjRF6yZbE8hEh5t3m" :zoom="zoom" :center="center" @ready="mapHandler" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <span class="block-info-title">
                      网关设备信息
                    </span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="device-info-container">
                    <div class="device-info">
                      网关产品名称：{{ deviceDetail.name }}
                    </div>
                    <div class="device-info">
                      网关产品ID：{{ deviceDetail.id }}
                    </div>
                    <div class="device-info">
                      网关设备标识：{{ deviceDetail.identifier }}
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="在线记录" name="online-record">
            <el-row>
              <el-col :span="24">
                <span class="block-info-title">
                  在线记录
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span class="filter-label">创建时间</span>
                <el-date-picker
                  v-model="filterTimeRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <timerange-bar :activate-date-range="onlineStatusBar" :start="filterTimeRange[0]" :end="filterTimeRange[1]" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table
                  ref="onlineStatusTable"
                  :data="onlineStatusList"
                >
                  <el-table-column label="在线状态" width="200">
                    <template slot-scope="scope">
                      <div :class="{'positive': scope.row.status === 'online', 'negative': scope.row.status === 'offline'}" class="indicator">
                        <div class="dot" />
                        {{ scope.row.status | onlineStatusFilter }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="时间">
                    <template slot-scope="scope">{{ scope.row.date | dateTimeFilter }}</template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="功能点数据" name="function-info">
            功能点数据
          </el-tab-pane>
          <el-tab-pane label="子设备列表" name="subdevice-list">
            子设备列表
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import { getDeviceDetail, getOnlineStatusBar, getOnlineStatusList } from '~/assets/getters'

export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      deviceDetail: {},
      currentDeviceInfoTab: 'device-basic-info',
      zoom: 15,
      center: {
        lng: 0,
        lat: 0
      },
      locationInfo: '',
      filterTimeRange: [new Date(new Date() - 30 * 24 * 60 * 60 * 1000), new Date()],
      onlineStatusList: [],
      onlineStatusBar: []
    }
  },
  created() {
    this.getDeviceDetail()
    this.getOnlineStatus()
  },
  methods: {
    getDeviceDetail() {
      getDeviceDetail(Number(this.$route.params.id)).then((data) => {
        this.deviceDetail = data
      })
    },
    getOnlineStatus() {
      getOnlineStatusBar().then((data) => {
        this.onlineStatusBar = data
      })
      getOnlineStatusList().then((data) => {
        this.onlineStatusList = data
      })
    },
    mapHandler({ BMap }) {
      this.center.lng = this.deviceDetail.coords[0]
      this.center.lat = this.deviceDetail.coords[1]
      let geo = new BMap.Geocoder()
      let point = new BMap.Point(...this.deviceDetail.coords)
      geo.getLocation(point, (result) => {
        this.locationInfo = result.address
      })
    }
  }
}
</script>

<style lang="stylus">
.device-detail
  .device-info-container
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start

    .device-info
      margin-top: 15px
      width: 33%

      .clickable-text
        margin-left: 15px

  .device-location
    margin-top: 20px

  .map
    width: 100%
    height: 300px
</style>

<template>
  <div>
    <div class="full-date-range">
      <div v-for="(bar, index) in dateBars" :key="'bar' + index" class="active-bar" :style="{'left': bar.left, 'width': bar.width}" />
    </div>
    <div class="legends">
      <div v-for="(legend, index) in legends" :key="'legend' + index" class="legend" :style="{'width': String(100 / legendNumber) + '%'}">
        {{ legend | dateTimeFilter('MM-dd hh:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    start: {
      type: Date,
      default: () => new Date(new Date() - 30 * 24 * 3600 * 1000)
    },
    end: {
      type: Date,
      default: () => new Date()
    },
    activateDateRange: {
      type: Array,
      default: () => [
        {
          start: new Date(new Date() - 20 * 24 * 3600 * 1000),
          end: new Date(new Date() - 10 * 24 * 3600 * 1000)
        }
      ]
    },
    legendNumber: {
      type: Number,
      default: 7
    }
  },
  computed: {
    dateBars() {
      let dateRange = this.end - this.start
      let bars = []
      for (let item of this.activateDateRange) {
        let length = (item.end - item.start) / dateRange * 100
        let left = (item.start - this.start) / dateRange * 100
        bars.push({
          width: String(length) + '%',
          left: String(left) + '%'
        })
      }
      return bars
    },
    legends() {
      let dateRange = this.end - this.start
      let legends = []

      for (let i = 0; i < this.legendNumber; i++) {
        let t = new Date(this.start.getTime() + (dateRange / this.legendNumber * i))
        legends.push(t)
      }

      return legends
    }
  }
}
</script>

<style lang="stylus" scoped>
.full-date-range
  width: 100%
  height: 10px
  background-color: #CCC
  position: relative

  .active-bar
    height: 15px
    background-color: #409EFF
    position: absolute
    bottom: 0

.legends
  width: 100%
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  margin-top: 20px
  color: #AAA

</style>

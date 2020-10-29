<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-prop-types */
import { Line, mixins } from 'vue-chartjs'

const baseOption = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      gridLines: {
        display: false
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
}

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['customOptions'],
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    this.options = Object.assign(baseOption, this.customOptions)
    this.renderChart(this.chartData, this.options)
  }
}
</script>

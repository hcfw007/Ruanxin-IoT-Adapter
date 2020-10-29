<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-prop-types */
import { Doughnut, mixins } from 'vue-chartjs'

const baseOption = {
  cutoutPercentage: 70,
  legend: {
    display: false
  }
}

export default {
  extends: Doughnut,
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

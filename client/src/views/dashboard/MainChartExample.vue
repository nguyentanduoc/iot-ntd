<script>
import {
  Line,
  mixins
} from 'vue-chartjs'
const {
  reactiveProp
} = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['height'],
  data() {
    return {
      options: { //Chart.js options
        animation: false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride: true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps: 10,
        //Number - The value jump in the hard coded scale
        scaleStepWidth: 10,
        //Number - The scale starting value
        scaleStartValue: 0,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            },
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options),
      this.htmlLegend = this.generateLegend()
  }
}
</script>

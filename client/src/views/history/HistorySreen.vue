<template src="./templates/HistorySreen.html">
</template>
<script>
import MainChartExample from '../dashboard/MainChartExample'
import {
  Callout
} from '@coreui/vue'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import Sensor from '@/services/Sensor.js'
import Data from '@/services/Data.js'
export default {
  name: "history-sreen",
  components: {
    Callout,
    MainChartExample,
    Datepicker
  },
  data: () => ({
    datacollection: null,
    labels: [],
    temp_data: [],
    condition: {
      date: "",
      sensor: null,
      pointNumber: 3
    },
    sensors: [],
    pointNumber: [{
        value: 3,
        text: "3 điểm"
      },
      {
        value: 5,
        text: "5 điểm"
      },
      {
        value: 7,
        text: "7 điểm"
      },
      {
        value: 10,
        text: "10 điểm"
      },
      {
        value: 15,
        text: "15 điểm"
      }
    ]
  }),
  methods: {
    customFormatter(date) {
      moment.locale('vi');
      return moment(date).format('L');
    },
    getListForHistory() {
      Sensor.getListForHistory()
        .then(res => {
          if (res.data.sensors) {
            for (var i in res.data.sensors) {
              this.sensors.push({
                value: res.data.sensors[i]._id,
                text: res.data.sensors[i].name
              })
            }
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        })
    },
    getData(evt) {
      evt.preventDefault();
      this.labels = [];
      this.temp_data = [];
      Data.getDataForChartLine(this.condition)
        .then(res => {
          if (res.data.data && res.data.data.length > 0) {
            for (var i in res.data.data) {
              this.labels.push(moment(res.data.data[i].date_receive).format('LTS'));
              this.temp_data.push(res.data.data[i].values);
            }
          }
          this.fillData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    fillData() {
      this.datacollection = {
        labels: this.labels,
        datasets: [{
          label: "Nhiệt Độ",
          borderColor: "#f87979",
          data: this.temp_data,
          fill: false
        }]
      };
    },
  },
  created() {
    this.getListForHistory();
  }
}
</script>
<style lang="scss" scoped>
</style>

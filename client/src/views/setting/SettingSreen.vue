<template src="./templates/SettingSreen.html">
</template>
<script>
import Sensor from '@/services/Sensor.js'
import Setting from '@/services/Setting.js'
import SettingSensor from './part/SensorSetting.vue'
export default {
  name: 'setting',
  components: {
    SettingSensor
  },
  data: () => ({
    show: true,
    sensors: [],
    setting: {
      sensor: "",
      max: "",
      min: ""
    },
    showAlert: false,
    colorAlert: "",
    msg: "",
    isEdit: false
  }),
  methods: {
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
    onCreate(evt) {
      evt.preventDefault();
      if (!this.isEdit) {
        Setting.create(this.setting)
          .then(res => {
            this.showAlert = true;
            this.colorAlert = 'primary';
            this.msg = 'Cài đặt thành công';
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          })
          .catch(err => {
            this.showAlert = true;
            this.colorAlert = 'warning';
            this.msg = 'Sensor đã được cài đặt';
          });
      } else {
        Setting.modified(this.setting)
          .then(res => {
            this.showAlert = true;
            this.colorAlert = 'primary';
            this.msg = 'Cập nhật thành công';
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          })
          .catch(err => {
            this.showAlert = true;
            this.colorAlert = 'warning';
            this.msg = 'Cập nhật thất bại';
          });
      }
    },
    change(evt) {
      Setting.findByIdSensor({
          idSensor: evt.target.value
        })
        .then(res => {
          if (res.data.setting) {
            this.isEdit = true;
            if (res.data.setting.min) {
              this.setting.min = res.data.setting.min;
            }
            if (res.data.setting.max) {
              this.setting.max = res.data.setting.max;
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.getListForHistory();
  }
}
</script>
<style lang="scss" scoped>
</style>

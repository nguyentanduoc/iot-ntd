<template src="./templates/SensorScreen.html"></template>
<script>
import Arduino from '@/services/Arduino.js'
import Sensor from '@/services/Sensor.js'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'sensor',
  props: {
    caption: {
      type: String,
      default: 'Users'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Datepicker
  },
  data() {
    return {
      colorAlert: '',
      showAlert: false,
      showAlertListData: false,
      msg: '',
      sensors: [],
      arduinos: [],
      dataList: [],
      arduino: null,
      isModified: false,
      sensor: {
        _id: '',
        name: '',
        arduino: '',
        create_date: '',
        update_create: '',
        status: '',
        dataType: 1
      },
      fields: {
        name: {
          label: 'Tên sensor',
          key: 'name'
        },
        arduino: {
          label: 'Tên Arduino',
          key: 'arduino[0].name'
        },
        status: {
          label: 'Tình Trạng'
        },
        options: {
          label: 'Tùy Chỉnh'
        }
      }
    }
  },
  methods: {
    create(evt) {
      evt.preventDefault();
      if (this.isModified == false) {
        Sensor.create({
            sensor: this.sensor,
            arduino: this.arduino
          })
          .then(response => {
            if (response.status == 201) {
              this.colorAlert = 'success';
              this.showAlert = true;
              this.msg = response.data.message;
              this.getList();
            }
          })
          .catch(error => {
            this.colorAlert = 'danger';
            this.showAlert = true;
            if (error.response) {
              this.msg = error.response.data.message;
            } else {
              this.msg = error.response;
            }
          })
      } else {
        Sensor.modified({
            sensor: this.sensor,
            arduino: this.arduino
          })
          .then(response => {
            if (response.status == 201) {
              this.colorAlert = 'success';
              this.showAlert = true;
              this.msg = response.data.message;
              this.getList();
            }
          })
          .catch(error => {
            this.colorAlert = 'danger';
            this.showAlert = true;
            if (error.response) {
              this.msg = error.response.data.message;
            } else {
              this.msg = error.response;
            }
          })
      }
    },
    getList() {
      Sensor.getList()
        .then(res => {
          if (res.data.listData) {
            this.sensors = res.data.listData;
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        })
    },
    getListArduino() {
      Arduino.getList()
        .then(res => {
          if (res.data.arduinoList) {
            for (var a in res.data.arduinoList) {
              this.arduinos.push({
                value: res.data.arduinoList[a]._id,
                text: res.data.arduinoList[a].name
              })
            }
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        })
    },
    rowClicked(item) {
      this.isModified = true;
      Sensor.findById({
          id: item._id
        })
        .then(res => {
          if (res.data.data) {
            this.sensor = res.data.data
            this.arduino = this.sensor.arduino[0]._id
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    remove(id) {
      console.log(id);
      Sensor.delete({
          id: id
        })
        .then(res => {
          if (res.data) {
            this.getList();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    customFormatter(date) {
      moment.locale('vi');
      return moment(date).format('L');
    },
    reset() {
      this.sensor._id = '';
      this.sensor.name = '';
      this.arduino = null;
      this.isModified = false;
    },
    getBadge(status) {
      return status == 1 ? 'success' :
        status == 2 ? 'secondary' : 'primary'
    },
    getLableStatus(name) {
      return name == 1 ? 'Hoạt Động' :
        name == 2 ? 'Ngừng Hoạt động' : '__'
    },
  },
  created() {
    this.getListArduino();
    this.getList();
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

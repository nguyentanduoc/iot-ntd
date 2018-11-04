<template src="./templates/Arduino.html"></template>
<script>
import Arduino from '@/services/Arduino.js'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'aruino',
  components: {
    Datepicker
  },
  data() {
    return {
      name: '',
      location: '',
      colorAlert: '',
      showAlert: false,
      showAlertListData: false,
      msg: '',
      dataList: [],
      arduino: {
        name: '',
        location: '',
        create_date: '',
        update_create: '',
        status: ''
      },
      fields: [{
          key: 'name',
          label: 'Tên Arduino'
        },
        {
          key: 'location',
          label: 'Vị Trí'
        },
        {
          key: 'status',
          label: 'Tình Trạng'
        },
        {
          key: 'options',
          label: 'Tỳ Chọn'
        }
      ],
      isUpdate: false
    }
  },
  methods: {
    myRowClickHandler(record) {
      this.isUpdate = true;
      this.showDetail(record._id);
    },
    create(evt) {
      evt.preventDefault();
      if (this.isUpdate) {
        Arduino.modified({
            arduino: this.arduino
          })
          .then(response => {
            if (response.status == 200) {
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
        Arduino.create({
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
      Arduino.getList()
        .then(res => {
          if (res.data.arduinoList) {
            this.dataList = res.data.arduinoList;
          }
        })
        .catch(err => {
          this.showAlertListData = true;
          this.msg = err;
        })
    },
    showDetail(id) {
      Arduino.findById({
          id: id
        })
        .then(res => {
          this.arduino = res.data.arduino[0]
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteArduino(id) {
      Arduino.deleteArduino({
          id: id
        })
        .then(res => {
          if (res.data) {
            this.getList();
            console.log(res);
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
    getBadge(status) {
      return status == 1 ? 'success' :
        status == 2 ? 'secondary' : 'primary'
    },
    getLableStatus(name) {
      return name == 1 ? 'Hoạt Động' :
        name == 2 ? 'Ngừng Hoạt động' : '__'
    },
    resetFrom() {
      this.arduino._id = null;
      this.arduino.name = null;
      this.arduino.location = null;
      this.arduino.date_create = new Date();
      this.arduino.date_update = new Date();
      this.arduino.status = 1;
    },
    reset() {
      this.arduino._id = null;
      this.arduino.name = null;
      this.arduino.location = null;
      this.arduino.date_create = null;
      this.arduino.date_update = null;
      this.arduino.status = null;
    }
  },
  created() {
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

.table-responsive-sm table tbody tr:hover {
  color: #2185d0;
  cursor: pointer;
}
</style>

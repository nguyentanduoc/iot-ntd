<template>
<div class="animated fadeIn">
  <b-row>
    <b-col md="7">
      <b-card>
        <div slot="header">
          Danh sách <strong>Sensor</strong>
        </div>
        <b-alert :show="showAlertListData" :variant="colorAlert">{{msg}}</b-alert>
        <b-table responsive="sm" :items="sensors" :fields="fields" :fixed="true">
          <template slot="options" slot-scope="data">
            <b-button variant="info" size="sm" @click.stop="showDetail(data.item._id)" class="mr-2">Chi Tiết</b-button>
            <b-button variant="danger" size="sm" @click.stop="remove(data.item._id)" class="mr-2">Xóa</b-button>
          </template>
        </b-table>
        <nav>
          <!-- <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons /> -->
        </nav>
      </b-card>
    </b-col>
    <b-col md="5">
      <b-card>
        <div slot="header">
          Chi tiết <strong>Sensor</strong>
        </div>
        <b-form @submit="create" @reset="reset">
          <b-alert :show="showAlert" :variant="colorAlert">{{msg}}</b-alert>
          <b-form-group label="Mã Sensor" label-for="id" :label-cols="4" :horizontal="true">
            <b-form-input id="id" name="id" type="text" v-model="sensor._id" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group label="Tên Sensor" label-for="name" :label-cols="4" :horizontal="true">
            <b-form-input id="name" name="name" type="text" v-model="sensor.name" required></b-form-input>
          </b-form-group>
          <b-form-group label="Arduino" label-for="arduino" :label-cols="4" :horizontal="true">
            <b-form-select id="arduino" name="arduino" v-model="arduino" :options="arduinos">
              <template slot="first">
                <option value="null" disabled>--Chọn Arduino--</option>
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group label="Kiểu dữ liệu" label-for="dataType" :label-cols="4" :horizontal="true" required>
            <b-form-select id="arduino" name="dataType" v-model="sensor.dataType">
              <option value="1" selected>Dữ liệu liên tục</option>
              <option value="2">Dữ liệu tính hiệu</option>
            </b-form-select>
          </b-form-group>
          <b-form-group label="Ngày Tạo" label-for="dateCreate" :label-cols="4" :horizontal="true">
            <datepicker :bootstrapStyling="true" :format="customFormatter" id="dateCreate" :disabled="true" v-model="sensor.date_create"></datepicker>
          </b-form-group>
          <b-form-group label="Ngày Cập Nhật" label-for="dateUpdate" :label-cols="4" :horizontal="true">
            <datepicker :bootstrapStyling="true" :format="customFormatter" id="dateUpdate" :disabled="true" v-model="sensor.date_update"></datepicker>
          </b-form-group>
          <b-form-group label="Tình Trạng" label-for="staus" :label-cols="4" :horizontal="true">
            <b-form-radio-group id="staus" name="staus">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" v-model="sensor.status" value="1" checked>
                <label class="custom-control-label" for="customRadioInline1">Hoạt động</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" v-model="sensor.status" value="2">
                <label class="custom-control-label" for="customRadioInline2">Ngừng hoạt động</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <div slot="footer">
            <b-button class="float-right" type="reset" size="md" variant="danger"><i class="fa fa-ban"></i> Hủy</b-button>
            <b-button class="float-right" type="submit" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i> {{isModified ? 'Cập nhật' : 'Lưu'}}</b-button>
          </div>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>
<script>
import Arduino from '@/services/Arduino.js'
import Sensor from '@/services/Sensor.js'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'sensor',
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
    showDetail(id) {
      this.isModified = true;
      Sensor.findById({
          id: id
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
    }
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

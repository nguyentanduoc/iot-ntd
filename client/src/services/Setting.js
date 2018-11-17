import Api from './Api';
var urlBase = 'setting';
export default {
  create(setting) {
    console.log(setting);
    return Api().post(urlBase + '/create', setting);
  },
  findById(id) {
    return Api().post(urlBase + '/findById', id);
  },
  findByIdSensor(idSensor) {
    return Api().post(urlBase + '/findByIdSensor', idSensor);
  },
  modified(setting) {
    return Api().post(urlBase + '/modified', setting);
  }
}

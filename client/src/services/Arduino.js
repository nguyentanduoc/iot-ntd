import Api from './Api';
var urlBase ='arduino';
export default {
  create (arduino) {
    return Api().post(urlBase + '/create', arduino);
  },
  getList() {
    return Api().post(urlBase + '/getList');
  },
  deleteArduino(id){
    return Api().post(urlBase + '/deleteArduino', id);
  },
  findById(id){
    return Api().post(urlBase + '/findById', id);
  },
  modified(arduino){
    return Api().post(urlBase + '/modified', arduino);
  },
};

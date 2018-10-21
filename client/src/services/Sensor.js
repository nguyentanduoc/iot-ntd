import Api from './Api';
var urlBase ='sensor';
export default {
  create (sensor) {
    return Api().post(urlBase + '/create', sensor);
  },
  getList() {
    return Api().post(urlBase + '/getList');
  },
  findById(id){
    return Api().post(urlBase + '/findById', id);
  },
  delete(id){
    return Api().post(urlBase + '/delete', id);
  },
  modified(sensor){
    return Api().post(urlBase + '/modified', sensor);
  },
  getListForHistory(){
    return Api().post(urlBase + '/getListForHistory');
  }
};

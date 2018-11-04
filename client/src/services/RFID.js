import Api from './Api';
var urlBase ='rfid';
export default {
  create (rfid) {
    return Api().post(urlBase + '/create', rfid);
  }
};

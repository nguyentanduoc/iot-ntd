import Api from './Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
  login(credentials) {
    return Api().post('login', credentials);
  },
  create(credentials) {
    return Api().post('user/create', credentials);
  },
  getListUser() {
    return Api().post('user/getAllUser');
  },
  getUser(_id) {
    return Api().post('user/getUser', _id);
  },
  updateUser(user){
    return Api().post('user/updateUser', user);
  },
  restPsw(_id){
    return Api().post('user/restPsw', _id);
  }
};

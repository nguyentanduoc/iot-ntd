import Api from './Api';
var urlBase ='data';
export default {
  getDataForChartLine (condition) {
    return Api().post(urlBase + '/getDataForChartLine', condition);
  }
}

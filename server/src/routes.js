const UserController = require('./controllers/UserController');
const AuthControllerPolicy = require('./policies/AuthControllerPolicy');
const ArduinoController = require('./controllers/ArduinoController');
const SensorController = require('./controllers/SensorController');
const DataController = require('./controllers/DataController');
const SettingController = require('./controllers/SettingController');
const RFIDController = require('./controllers/RFIDController');
module.exports = (app) => {
  // user url
  app.post('/register',
    AuthControllerPolicy.register,
    UserController.register
  );
  app.post('/user/create',
    AuthControllerPolicy.register,
    UserController.register
  );
  app.post('/user/getAllUser', UserController.getAllUser);
  app.post('/user/getUser', UserController.getUser);
  app.post('/user/updateUser', UserController.updateUser);
  app.post('/user/restPsw', UserController.restPsw);
  app.post('/login', UserController.login);
  // arduino url
  app.post('/arduino/create', ArduinoController.create);
  app.post('/arduino/getList', ArduinoController.getList);
  app.post('/arduino/deleteArduino', ArduinoController.deleteArduino);
  app.post('/arduino/findById', ArduinoController.findById);
  app.post('/arduino/modified', ArduinoController.modified);
  // sensor url
  app.post('/sensor/create', SensorController.create);
  app.post('/sensor/getList', SensorController.getList);
  app.post('/sensor/delete', SensorController.delete);
  app.post('/sensor/findById', SensorController.findById);
  app.post('/sensor/modified', SensorController.modified);
  app.post('/sensor/getSensorForChart', SensorController.getSensorForChart);
  // data url
  app.post('/data/getDataForChartLine', DataController.getDataForChartLine);
  // setting url
  app.post('/setting/create', SettingController.create);
  app.post('/setting/findByIdSensor', SettingController.findByIdSensor);
  app.post('/setting/modified', SettingController.modified);

  // rfid
  app.post('/rfid/create', RFIDController.create);
};

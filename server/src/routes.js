var UserController = require('./controllers/UserController');
var AuthControllerPolicy = require('./policies/AuthControllerPolicy');
var ArduinoController = require('./controllers/ArduinoController');
var SensorController = require('./controllers/SensorController');
var DataController = require('./controllers/DataController');
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
  // sensor url
  app.post('/sensor/create', SensorController.create);
  app.post('/sensor/getList', SensorController.getList);
  app.post('/sensor/delete', SensorController.delete);
  app.post('/sensor/findById', SensorController.findById);
  app.post('/sensor/modified', SensorController.modified);
  app.post('/sensor/getListForHistory', SensorController.getListForHistory);
  // data url
  app.post('/data/getDataForChartLine', DataController.getDataForChartLine);
};

const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ReceiveData = require('./models/ReceiveData');
const Sensor = require('./models/Sensor');
const Setting = require('./models/Setting');
const RFID = require('./models/RFID');
const mqtt = require('mqtt');
mongoose.connect('mongodb://localhost/Iot_SmartHome', {
  useNewUrlParser: true
});
// parse json
function ParseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};
// config mqtt
var options = {
  clientId: 'Server-' + parseInt(Math.random() * 100000),
  username: 'zddelmko',
  password: 'NQ-HVjwgF3v1'
};
var client = mqtt.connect('wss://m10.cloudmqtt.com:38332', options);
client.on('connect', function() {
  client.subscribe('ESP8266/#', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected and sub#');
    }
  });
});
client.on('message', function(topic, message) {
  if (ParseJSON(message) != null) {
    if (topic === 'ESP8266/SENDDATA') {
      var arduinoSenddata = ParseJSON(message);
      console.log(arduinoSenddata);
      if (arduinoSenddata.sensor) {
        Sensor.findOne({
          _id: arduinoSenddata.sensor._id
        }, (err, docs) => {
          if (err) {
            console.log(err + arduinoSenddata.sensor._id);
          } else {
            var receiveData = new ReceiveData({
              _id: new mongoose.Types.ObjectId(),
              sensor: docs,
              values: arduinoSenddata.value
            });
            receiveData.save();
          }
        });
        Setting.findOne({
          sensor: arduinoSenddata.sensor._id
        }, (err, setting) => {
          if (err) {
            console.log(err);
          } else {
            if (setting) {
              console.log(`${setting.min} min, ${setting.max} max, value ${arduinoSenddata.value}`);
              var dataCondition = arduinoSenddata;
              if (setting.min < arduinoSenddata.value && arduinoSenddata.value < setting.max) {
                client.publish(`API/WARNING/${arduinoSenddata.sensor._id}`, `{"warning": 0, "type": 0, "sensor": "${arduinoSenddata.sensor._id}"}`);
              } else {
                if (dataCondition.value > setting.max) {
                  client.publish(`API/WARNING/${arduinoSenddata.sensor._id}`, `{"warning": 1, "type": 1, "sensor": "${arduinoSenddata.sensor._id}"}`);
                } else {
                  if (dataCondition.value < setting.min) {
                    client.publish(`API/WARNING/${arduinoSenddata.sensor._id}`, `{"warning": 1, "type": 2, "sensor": "${arduinoSenddata.sensor._id}"}`);
                  }
                }
              }
            }
          }
        });
      }
    }
    if (topic === 'ESP8266/OPEN_THE_DOOR') {
      arduinoSenddata = ParseJSON(message);
      console.log(arduinoSenddata);
      if (arduinoSenddata.value != null) {
        RFID.findOne({
          value: arduinoSenddata.value
        }).exec((err, rfid) => {
          if (err) {
            console.log(err);
          } else {
            if (rfid) {
              client.publish(`API/IS_OPEN_THE_DOOR`, `1`);
            }
          }
        });
      }
    }
  }
});

const app = express();

app.use(morgan('combine'));
app.use(bodyPaser.json());
app.use(cors());

require('./routes')(app);
app.listen(process.env.PORT || 8081);

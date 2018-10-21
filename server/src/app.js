const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ReceiveData = require('./models/ReceiveData');
const Sensor = require('./models/Sensor');
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
  client.subscribe('#', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('connected and sub#');
    }
  });
});
client.on('message', function(topic, message) {
  if (ParseJSON(message) != null) {
    var data = ParseJSON(message);
    if (data.sensor._id) {
      Sensor.findOne({
        _id: data.sensor._id
      }, (err, docs) => {
        if (err) {
          console.log(`Không có sensor này` + data.sensor._id);
        } else {
          var receiveData = new ReceiveData({
            _id: new mongoose.Types.ObjectId(),
            sensor: docs,
            values: data.value
          });
          receiveData.save();
        }
      });
    } else {
      console.log(`không có id sensor`);
    }
  }
});

const app = express();

app.use(morgan('combine'));
app.use(bodyPaser.json());
app.use(cors());

require('./routes')(app);
app.listen(process.env.PORT || 8081);

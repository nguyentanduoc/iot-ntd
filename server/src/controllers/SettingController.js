const mongoose = require('mongoose');
const Setting = require('../models/Setting');
const Sensor = require('../models/Sensor');
module.exports = {
  create(req, res) {
    const reqSetting = req.body;
    Sensor.findOne({
      _id: reqSetting.sensor
    }, (err, sensor) => {
      if (err) {
        console.log(err);
      } else {
        Setting.find({
          sensor: sensor
        }, (err, setting) => {
          if (err) {
            res.status(406).json({
              message: err
            });
          } else {
            if (setting.lenght > 0) {
              console.log(setting);
              res.status(406).json({
                message: 'Sensor đã cài đặt dư liệu'
              });
            } else {
              var settingModel = new Setting({
                _id: new mongoose.Types.ObjectId(),
                sensor: sensor,
                min: reqSetting.min,
                max: reqSetting.max
              });
              settingModel.save()
                .then(() => {
                  res.status(201).json({
                    message: 'Cài đặt thành công!'
                  });
                })
                .catch(err => {
                  res.status(406).json({
                    message: err
                  });
                });
            }
          }
        });
      }
    });
  },
  findByIdSensor(req, res) {
    const data = req.body;
    Setting.findOne({
      sensor: data.idSensor
    }).populate('sensor').exec(function(err, setting) {
      if (err) {
        res.status(406).json({
          message: err
        });
      } else {
        res.status(200).json({
          setting: setting
        });
      }
    });
  },
  modified(req, res) {
    const settingReq = req.body;
    Setting.updateOne({
      sensor: settingReq.sensor
    }, {
      $set: {
        max: settingReq.max,
        min: settingReq.min
      }
    }).exec(function(err, setting) {
      if (err) {
        res.status(406).json({
          message: err
        });
      } else {
        res.status(200).json({
          setting: setting
        });
      }
    });
  }
};

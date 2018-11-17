const Mongoose = require('mongoose');
const Setting = require('../models/Setting');
// const Sensor = require('../models/Sensor');
module.exports = {
  create(req, res) {
    const {
      setting,
      sensor
    } = req.body;
    Setting.findOne({
      sensor: sensor
    }, (err, resultSetting) => {
      if (err) {
        console.log(err);
      } else {
        if (resultSetting) {
          Setting.updateOne({
            sensor: sensor
          }, {
            $set: {
              max: setting.max,
              min: setting.min,
              status: setting.status
            }
          }, (docs) => {
            console.log(docs);
            res.status(200).json({
              message: 'Tạo thành công!',
              setting: docs
            });
          });
        } else {
          console.log(setting.status);
          var createSetting = new Setting({
            _id: new Mongoose.Types.ObjectId(),
            max: setting.max,
            min: setting.min,
            sensor: sensor,
            status: setting.status
          });
          createSetting.save()
            .then((resultSetting) => {
              res.status(200).json({
                message: 'Tạo thành công!',
                setting: resultSetting
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err
              });
            });
        }
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

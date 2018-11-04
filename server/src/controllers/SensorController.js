const mongoose = require('mongoose');
const Sensor = require('../models/Sensor');
module.exports = {
  create(req, res) {
    var {
      sensor,
      arduino
    } = req.body;
    Sensor.find({
      name: sensor.name
    }, function(err, docs) {
      if (err) {
        res.status(400).json({
          message: err
        });
      } else {
        if (docs.length === 0) {
          var sensorModel = new Sensor({
            _id: new mongoose.Types.ObjectId(),
            name: sensor.name,
            arduino: arduino,
            dataType: sensor.dataType
          });
          sensorModel.save()
            .then(() => {
              res.status(201).json({
                message: 'Tạo thành công!'
              });
            })
            .catch(err => {
              res.status(406).json({
                message: err
              });
            });
        } else {
          res.status(400).json({
            message: `Sensor đã tồn tại`
          });
        }
      }
    });
  },
  getList(req, res) {
    Sensor.find({}).sort({
      'create_date': -1
    }).sort({
      'create_update': -1
    }).populate('arduino').limit(5).exec((err, docs) => {
      if (!err && docs) {
        res.status(201).json({
          listData: docs
        });
      } else {
        res.status(401).json({
          message: `Xảy ra lỗi khi try vấn`
        });
      }
    });
  },
  delete(req, res) {
    var {
      id
    } = req.body;
    Sensor.findOneAndRemove({
      _id: id
    }).remove().exec((err) => {
      if (!err) {
        res.status(201).json({
          message: `Xóa thành công`
        });
      } else {
        res.status(401).json({
          message: err
        });
      }
    });
  },
  findById(req, res) {
    var {
      id
    } = req.body;
    Sensor.findOne({
      _id: id
    }).populate('arduino').exec((err, docs) => {
      if (!err) {
        res.status(201).json({
          data: docs
        });
      } else {
        res.status(401).json({
          message: err
        });
      }
    });
  },
  modified(req, res) {
    var {
      sensor,
      arduino
    } = req.body;
    Sensor.findById({
      _id: sensor._id
    }).exec((err, docs) => {
      if (!err) {
        docs.name = sensor.name;
        docs.arduino = arduino;
        docs.date_update = new Date();
        docs.status = sensor.status;
        docs.dataType = sensor.dataType;
        docs.save()
          .then(() => {
            res.status(201).json({
              message: `Cập nhật thành công`
            });
          })
          .catch((err) => {
            res.status(401).json({
              message: err
            });
          });
      } else {
        res.status(401).json({
          message: err
        });
      }
    });
  },
  getSensorForChart(req, res) {
    Sensor.find({
      dataType: '1'
    }, function(err, docs) {
      if (err) {
        return res.status(401).json({
          message: err
        });
      } else {
        return res.status(200).json({
          sensors: docs
        });
      }
    });
  }
};

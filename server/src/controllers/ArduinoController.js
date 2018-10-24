var Arduino = require('../models/Arduino');
var mongoose = require('mongoose');
module.exports = {
  create(req, res) {
    var {
      arduino
    } = req.body;
    Arduino.find({
      name: arduino.name
    }, function(err, docs) {
      if (err) {
        res.status(400).json({
          message: err
        });
      } else {
        if (docs.length === 0) {
          var arduinoModel = new Arduino({
            _id: new mongoose.Types.ObjectId(),
            name: arduino.name,
            location: arduino.location,
            data_create: new Date('<dd-MM-YYYY>'),
            data_update: new Date('<dd-MM-YYYY>')
          });
          arduinoModel.save()
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
          res.status(406).json({
            message: `Arduino đã tồn tại`
          });
        }
      }
    });
  },
  getList(req, res) {
    Arduino.find({}).sort({
      'create_date': -1
    }).limit(5).exec((err, docs) => {
      if (!err && docs) {
        res.status(201).json({
          arduinoList: docs
        });
      } else {
        res.status(401).json({
          message: `Xảy ra lỗi khi try vấn`
        });
      }
    });
  },
  deleteArduino(req, res) {
    var {
      id
    } = req.body;
    Arduino.find({
      _id: id
    }).remove().exec((err) => {
      if (!err) {
        res.status(201).json({
          message: `Xóa thành công`
        });
      } else {
        res.status(401).json({
          message: `Xảy ra lỗi khi try vấn`
        });
      }
    });
  },
  findById(req, res) {
    var {
      id
    } = req.body;
    Arduino.find({
      _id: id
    }).exec((err, docs) => {
      if (!err) {
        res.status(201).json({
          arduino: docs
        });
      } else {
        res.status(401).json({
          message: `Xảy ra lỗi khi try vấn`
        });
      }
    });
  }
};

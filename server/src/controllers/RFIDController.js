const mongoose = require('mongoose');
const RFID = require('../models/RFID');
const User = require('../models/User');
module.exports = {
  create(req, res) {
    var {
      userId,
      rfidValue
    } = req.body;
    RFID.findOne({
      user: userId
    }, function(err, docsUserRFID) {
      if (err) {
        console.log(err);
      } else {
        console.log(docsUserRFID);
        if (docsUserRFID != null) {
          RFID.updateOne({
            _id: docsUserRFID._id
          }, {
            $set: {
              date_update: new Date(),
              value: rfidValue
            }
          }).exec((err, updateRfid) => {
            if (err) {
              res.status(400).json({
                message: err
              });
            } else {
              res.status(200).json({
                updateRfid: updateRfid
              });
            }
          });
        } else {
          User.findOne({
            _id: userId
          }, function(err, docsUser) {
            if (err) {
              res.status(500).json({
                message: err
              });
            } else {
              var rfidModel = new RFID({
                _id: new mongoose.Types.ObjectId(),
                data_create: new Date(),
                data_update: new Date(),
                value: rfidValue,
                user: docsUser
              });
              rfidModel.save()
                .then(() => {
                  res.status(201).json({
                    message: 'Tạo thành công!'
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    message: err
                  });
                });
            }
          });
        }
      }
    });
  }
};

var ReceiveData = require('../models/ReceiveData');
var moment = require('moment');
module.exports = {
  getDataForChartLine(req, res) {
    var condition = req.body;
    var startDate = moment(condition.date).format('YYYY-MM-DD HH:MM:ss').toString();
    var endDate = moment(condition.date).add(24, 'hours').format('YYYY-MM-DD HH:MM:ss').toString();
    ReceiveData.find({
      date_receive: {
        '$gte': startDate,
        '$lt': endDate
      },
      sensor: {
        _id: condition.sensor
      }
    })
      .limit(condition.pointNumber)
      .sort({
        date_receive: -1
      })
      .exec(function(err, docs) {
        if (err) {
          return res.status(400).json({
            message: err
          });
        } else {
          return res.status(200).json({
            data: docs
          });
        }
      });
  }
};

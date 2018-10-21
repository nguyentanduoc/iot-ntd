const mongoose = require('mongoose');
const receiveData = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  values: Number,
  date_receive: {
    type: Date,
    default: Date.now
  },
  sensor: [{
    type: mongoose.Schema.ObjectId,
    ref: 'sensor'
  }]
});
module.exports = mongoose.model('receive_data', receiveData);

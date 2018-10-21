const mongoose = require('mongoose');
const setting = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sensor: [{
    type: mongoose.Schema.ObjectId,
    ref: 'sensor'
  }],
  max: Number,
  min: Number
});
module.exports = mongoose.model('setting', setting);

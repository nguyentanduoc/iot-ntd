let mongoose = require('mongoose');
let setting = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sensor: [{
    type: mongoose.Schema.ObjectId,
    ref: 'sensor'
  }],
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean
  }
});
module.exports = mongoose.model('setting', setting);

let mongoose = require('mongoose');
let sensor = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  date_create: {
    type: Date,
    default: Date.now
  },
  date_update: {
    type: Date,
    default: Date.now
  },
  arduino: [{
    type: mongoose.Schema.ObjectId,
    ref: 'arduino'
  }],
  status: {
    type: Number,
    default: 1
  }, // 1: active, 2: inactive
  dataType: {
    type: Number,
    required: true
  } // 1: contiguity data, 2: signal data
});
module.exports = mongoose.model('sensor', sensor);

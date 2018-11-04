let mongoose = require('mongoose');
let rfid = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date_create: {
    type: Date,
    default: Date.now
  },
  date_update: {
    type: Date,
    default: Date.now
  },
  user: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }],
  value: {
    type: String
  }
});
module.exports = mongoose.model('rfid', rfid);

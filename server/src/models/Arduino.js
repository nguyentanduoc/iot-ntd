let mongoose = require('mongoose');
let arduino = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  location: String,
  date_create: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now },
  status: { type: Number, default: 1 } // 1: active, 2: inactive
});
module.exports = mongoose.model('arduino', arduino);

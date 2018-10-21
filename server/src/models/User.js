let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  is_admin: {
    type: Number,
    default: 2
  }, // 1: admin, 2: nomal user
  create_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 1
  } // 1: active, 2: inactive
});
module.exports = mongoose.model('user', userSchema);

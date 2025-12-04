js
const mongoose = require('mongoose');
const S = new mongoose.Schema({
  name: String,
  phone: String,
  balance: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', S);
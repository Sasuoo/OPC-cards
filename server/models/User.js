const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  name: String,
  phone: String,
  balance: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', Schema);

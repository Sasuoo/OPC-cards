const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderNumber: String,
  amount: Number,
  status: String,
  createdAt: Date,
  completedAt: Date
});
module.exports = mongoose.model('PendingTopup', Schema);

js
const mongoose = require('mongoose');
const S = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderNumber: String,
  amount: Number,
  status: { type: String, enum: ['pending','completed','cancelled'], default: 'pending' },
  createdAt: Date,
  completedAt: Date
});
module.exports = mongoose.model('PendingTopup', S);
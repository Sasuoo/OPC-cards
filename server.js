js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./models/User');
const PendingTopup = require('./models/PendingTopup');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/topupapp', {
  useNewUrlParser: true, useUnifiedTopology: true
});

app.post('/api/topup/request', async (req, res) => {
  const { userId, senderNumber, amount } = req.body;
  if (!userId || !senderNumber || !amount) return res.status(400).json({ error: 'missing' });

  const normalized = normalizeNumber(senderNumber);

  const pending = await PendingTopup.create({
    userId, senderNumber: normalized, amount: parseFloat(amount),
    status: 'pending', createdAt: new Date()
  });

  return res.json({ ok: true, pendingId: pending._id, instructions: {
    to: '0925717434',
    note: 'أرسل الرصيد من رقمك إلى 0925717434 وسيتم التحقق تلقائياً.'
  }});
});

app.post('/webhook/sms', async (req, res) => {
  const from = req.body.From || req.body.from || '';
  const body = req.body.Body || req.body.body || '';
  const parsed = parseLibyanaSms(body);
  if (!parsed) return res.send('<Response></Response>');

  const incomingNumber = normalizeNumber(parsed.senderNumber);
  const incomingAmount = parseFloat(parsed.amount);

  const match = await PendingTopup.findOne({
    senderNumber: incomingNumber,
    amount: incomingAmount,
    status: 'pending',
    createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
  });

  if (!match) return res.send('<Response></Response>');

  match.status = 'completed';
  match.completedAt = new Date();
  await match.save();

  const user = await User.findById(match.userId);
  if (user) {
    user.balance = (user.balance || 0) + incomingAmount;
    await user.save();
  }

  return res.send('<Response></Response>');
});

function normalizeNumber(n){
  let s = n.toString().replace(/[^0-9]/g, '');
  if (s.length === 10 && s.startsWith('9')) s = '0' + s;
  return s;
}

function parseLibyanaSms(text){
  const amountMatch = text.match(/(\d+[\.,]?\d{0,2})/);
  const phoneMatch = text.match(/(09\d{8})/);
  if (!amountMatch || !phoneMatch) return null;
  return { amount: amountMatch[1].replace(',', '.'), senderNumber: phoneMatch[1] };
}

app.listen(3000, ()=> console.log('SERVER RUNNING')); 
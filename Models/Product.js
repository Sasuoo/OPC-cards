const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  category: { type: String, default: "بطاقات" },
  stock: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Product', ProductSchema);

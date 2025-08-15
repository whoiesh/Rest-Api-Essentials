const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      type: { type: String, enum: ['product', 'service'], required: true },
      item: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.type', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      tax: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

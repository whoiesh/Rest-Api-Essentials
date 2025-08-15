const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      type: { type: String, enum: ['product', 'service'], required: true },
      item: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.type', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

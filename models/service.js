const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

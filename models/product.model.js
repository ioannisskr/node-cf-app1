const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let productSchema = new Schema({
  product: { type: String, required: [true, 'Product name is a required field'] },
  cost: { type: Number, required: [true, 'Cost is a required field'] },
  description: {type: String, required: true},
  quantity: { type: Number, required: [true, 'Quantity is a required field']}
}, {
  collection: 'products',
  timestamps: true
});

productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema);

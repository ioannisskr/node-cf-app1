const Product = require('../models/product.model');

exports.findAll = async(req, res) => {
  console.log('Find all products');
  try {
    const result = await Product.find();
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(`Problem reading products ${err}`); 
  }
};

exports.findOne = async(req, res) => {
  console.log('Find a product');
  const _id = req.params._id;
  try {
    const result = await Product.findById(_id);
    res.status(200).json({ data: result });
  } catch(err) {
    console.log(`Problem reading product ${err}`); 
  }
};

exports.create = async (req, res) => {
  console.log('Insert product');
  console.log(req.body);

  const newProduct = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  });

  try {
    const result = await newProduct.save();
    res.status(200).json({ data: result });
    console.log('Product saved');
  } catch(err) {
    res.status(400).json({ data: err });
    console.log('Problem saving product');
  }
};

exports.update = async(req, res) => {
  const _id = req.params._id;

  console.log('Update product');

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  };

  try {
    const result = await Product.findByIdAndUpdate(_id, updateProduct, { new: true});
    res.status(200).json({ data: result });
    console.log('Update successful: ', _id);
  } catch(err) {
    res.status(400).json({ data: err});
    console.log('Problem updating product: ', _id);
  }
};

exports.delete = async(req, res) => {
  const _id = req.params._id;

  console.log('Delete product', _id);

  try {
    const result = await Product.findByIdAndDelete(_id);
    res.status(200).json({ data: result });
    console.log('Product deleted: ', _id);
  } catch {
    res.status(400).json({ data: err });
    console.log('Problem deleting product', err);
  }
}
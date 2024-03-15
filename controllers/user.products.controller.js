const User = require('../models/user.model');

exports.findAll = async(req, res) => {
  console.log('Find all users products');

  try {
    const result = await User.find({}, { _id: 0, username: 1, products: 1 });
    res.status(200).json({ data: result });
    console.log('Reading all users products...');
  } catch(err) {
    res.status(400).json({ data: err });
    console.log('Problem reading users products', err);
  }
};

exports.findOne = async(req, res) => {
  const username = req.params.username;
  console.log('Find products for user: ', username);

  try {
    const result = await User.findOne({ username: username}, { _id: 0, username: 1, products: 1 });
    res.status(200).json({ data: result });
    console.log('Success finding products: ', username);
  } catch {
    res.status(400).json({ data: err });
    console.log('Problem finding products: ', username);
  }
};

exports.create = async(req, res) => {
  const username = req.body.username;
  const products = req.body.products;
  console.log('Inserting products for user', username); 

  try {
    const result = await User.updateOne({ username: username }, { $push: { products: products } });
    res.status(200).json({ data: result});
    console.log('Insert product success');
  } catch(err) {
    res.status(400).json({ data: err});
    console.log('Problem inserting');
  }
  };

  exports.update = async (req, res) => {
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.product.quantity;

    console.log('Updating product for user: ', username);

    try {
      const result = await User.updateOne({ username: username , "products._id": _id }, { $set: { "products.$.quantity": quantity }});
      res.status(200).json({ data: result});
      console.log('Update product success for: ', username);
    } catch(err) {
      res.status(400).json({ data: err });
      console.log('Problem updating: ', username);
    }
  };

  exports.delete = async (req, res) => {
    const username = req.params.username;
    const _id = req.params.id;

    console.log('Deleting product');

    try {
      const result = await User.updateOne({ username: username }, { $pull: { products: { _id: _id } } });
      res.status(200).json({ data: result});
      console.log('Success deleting product: ', username);
    } catch(err) {
      res.status(400).json({ data: err });
      console.log('Problem deleting product: ', username);
    }
  };
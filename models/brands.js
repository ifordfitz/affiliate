const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {type: String, required: true},
  website: String,
  image: {type: String, required: true},
  ownItem: Boolean,
  socialMedia: Boolean,
  description: String
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;

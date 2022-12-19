const mongoose = require("mongoose");

//Create schema
const wikiSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    maxlength: 30
  },
  category: {
    type: String, 
    enum: [ "Technology", "Media", "Food", "Health", "Miscellaneous" ],
    default: "Miscellaneous",
    required: true
  },
  author: {
    type: String,
    maxlength: 30,
    required: true
  },
  urlName: {
    type: String,
    index: {unique: true},
    maxlength: 30,
    match: /^[a-zA-Z0-9-_]+$/,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pageViews: {
    type: Number, 
    default: 0
  },
  createdDate: {
    type: String,
    default: Date.now()
  },
  updatedDate: {
    type: String,
    default: Date.now()
  }
});

//Compile schema and export
module.exports = mongoose.model("Wiki", wikiSchema);
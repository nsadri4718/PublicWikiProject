const mongoose = require("mongoose");

//Connect to MongoDB
const conn = mongoose.connect(
  "mongodb+srv://cs157:cs157@cs157.c0u1v.mongodb.net/WikiApp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  function(err) {
    if (!err) {
      console.log("Connected to MongoDB.");
    } else {
      console.log(err);
    }
  }      
);

//Export the database connection
module.exports = conn;
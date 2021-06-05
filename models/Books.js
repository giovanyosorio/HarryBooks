const mongoose = require("mongoose");
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

const BooksSchema = new Schema({
  nombre: {
    type: String,
    //required: true,
  },
  cantidad: {
    type: String,
    //required: true,
  },
  precio: {
    type: String,
    //default: true,
  },
  img: {
    type: String,
  },
  user_id: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("Books", BooksSchema);

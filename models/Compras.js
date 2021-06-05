const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const ComprasSchema = new Schema({
  book_id: { type: ObjectId },
  timestamp: { type: Date, default: Date.now },
  user_id: {
    type: ObjectId,
  },
  cantidad: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
  },
  valor: {
    type: String,
  },
  total: { type: Number },
  user: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("compras", ComprasSchema);

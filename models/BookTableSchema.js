const { default: mongoose } = require("mongoose");

const bookTableSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  no_of_seats: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  additional_info: {
    type: String,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
  },
});
const bookTableModel = mongoose.model("table-booking", bookTableSchema);
module.exports = bookTableModel;

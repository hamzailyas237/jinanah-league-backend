const { default: mongoose } = require("mongoose");

const bookTableSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
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
});
// const bookTable = mongoose.model('table', bookTableSchema)
// module.exports = bookTable

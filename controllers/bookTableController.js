const bookTableModel = require("../models/BookTableSchema");
const productModel = require("../models/productSchema");

const bookTableController = {
  bookTable: (req, res) => {
    bookTableModel.create(req.body).then(async (data) => {
      res.status(200).json({
        message: "Table booked successfully",
        data,
      });
    });
  },
};
module.exports = bookTableController;

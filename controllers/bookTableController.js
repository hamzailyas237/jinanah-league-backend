const bookTableModel = require("../models/BookTableSchema");
const productModel = require("../models/productSchema");

// Problem: data create in bookTable model either seats available or not. To solve this take out
// productModel.findById(restaurant) from bookTableModel.create(req.body).
// Firstly check the avaibility of seats and then create data.
const bookTableController = {
  bookTable: (req, res) => {
    const { no_of_seats, restaurant } = req.body;
    bookTableModel.create(req.body).then(async (tableData) => {
      productModel
        .findById(restaurant)
        .then(async (data) => {
          if (data.remaining_seats == 0) {
            res.status(400).json({
              message: `No seats available on the selected date or time`,
            });
          } else if (data.remaining_seats < no_of_seats) {
            res.status(400).json({
              message: `Only ${data.remaining_seats} seats available`,
            });
          } else {
            const booked_seats = data.booked_seats + no_of_seats;
            const remaining_seats = data.total_seats - booked_seats;
            await productModel
              .findByIdAndUpdate(
                restaurant,
                {
                  booked_seats,
                  remaining_seats,
                },
                { new: true }
              )
              .then((updateData) => {
                res.status(200).json({
                  message: "Table booked successfully",
                  data: tableData,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Something went wrong",
                });
              });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
          });
        });
    });
  },
};
module.exports = bookTableController;

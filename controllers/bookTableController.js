const bookTableModel = require("../models/BookTableSchema");
const productModel = require("../models/productSchema");

const bookTableController = {
  bookTable: (req, res) => {
    const { no_of_seats, restaurant, date } = req.body;
    productModel.findById(restaurant).then(async (data) => {
      bookTableModel
        .find({})
        .then(async (bookedTables) => {
          let bookedSeats = 0;

          bookedTables?.map((bookedTable) => {
            if (
              bookedTable?.date == date &&
              bookedTable?.restaurant == restaurant
            ) {
              return (bookedSeats += bookedTable?.no_of_seats);
            }
          });
          let remainingSeats = data?.total_seats - bookedSeats;

          if (bookedSeats == data?.total_seats) {
            res.status(400).json({
              message: `No seats available on ${date}`,
            });
          } else if (no_of_seats > remainingSeats) {
            res.status(400).json({
              message: `${remainingSeats} seats available on ${date}`,
            });
          } else {
            await bookTableModel
              .create(req.body)
              .then(async (tableData) => {
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

  // bookTable: (req, res) => {
  //   const { no_of_seats, restaurant } = req.body;
  //   productModel
  //     .findById(restaurant)
  //     .then(async (data) => {
  //       if (data.remaining_seats == 0) {
  //         res.status(400).json({
  //           message: `No seats available on the selected date or time`,
  //         });
  //       } else if (data.remaining_seats < no_of_seats) {
  //         res.status(400).json({
  //           message: `Only ${data.remaining_seats} seats available`,
  //         });
  //       } else {
  //         const booked_seats = data.booked_seats + no_of_seats;
  //         const remaining_seats = data.total_seats - booked_seats;
  //         bookTableModel.create(req.body).then(async (tableData) => {
  //           await productModel
  //             .findByIdAndUpdate(
  //               restaurant,
  //               {
  //                 booked_seats,
  //                 remaining_seats,
  //               },
  //               { new: true }
  //             )
  //             .then((updateData) => {
  //               res.status(200).json({
  //                 message: "Table booked successfully",
  //                 data: tableData,
  //               });
  //             })
  //             .catch((err) => {
  //               res.status(500).json({
  //                 message: "Something went wrong",
  //               });
  //             })
  //             .catch((err) => {
  //               res.status(500).json({
  //                 message: "Something went wrong",
  //               });
  //             });
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: "Something went wrong",
  //       });
  //     });
  // },
};
module.exports = bookTableController;

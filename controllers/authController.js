const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  signup: (req, res) => {
    const { fullname, phone, email, password, confirmPassword } = req.body;
    if ((!fullname || !email || !password || !phone, !confirmPassword)) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        message: "Password and confirm password should be same",
      });
      return;
    }

    userModel
      .findOne({ email })
      .then(async (user) => {
        if (user) {
          res.status(400).json({
            message: "This email is already in use",
          });
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = {
            fullname,
            phone,
            email,
            password: hashedPassword,
          };

          userModel
            .create(user)
            .then((user) => {
              res.status(200).json({
                message: "User signed up successfully",
                user,
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
          message: "Something went wrong.....",
        });
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    userModel
      .findOne({ email })
      .then(async (user) => {
        if (user) {
          var token = jwt.sign({ user }, process.env.JWT_KEY);
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            res.status(200).json({
              message: "User logged in successfully",
              user,
              token,
            });
          } else {
            res.status(400).json({
              message: "Email or password is incorrect",
            });
          }
        } else {
          res.status(400).json({
            message: "Email or password is incorrect",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
        });
      });
  },
};

module.exports = authController;

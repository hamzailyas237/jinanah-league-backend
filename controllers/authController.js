const userModel = require("../models/userSchema");
const googleUserModel = require("../models//googleUserSchema");
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
              var token = jwt.sign({ user }, process.env.JWT_KEY);
              res.status(200).json({
                message: "User signed up successfully",
                user,
                token,
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

  googleAuth: (req, res) => {
    const { fullname, phone, email, photo, uid, firebase_access_token } =
      req.body;

    if (!fullname || !email || !photo || !uid || !firebase_access_token) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    userModel
      .findOne({ email })
      .then((user) => {
        var token = jwt.sign({ user }, process.env.JWT_KEY);

        if (user) {
          res.status(200).json({
            message: "User logged in successfully",
            user,
            token,
          });
        } else {
          googleUserModel
            .findOne({ email })
            .then((user) => {
              if (user) {
                res.status(200).json({
                  message: "User logged in successfully",
                  user,
                  token,
                });
              } else {
                const userToCreate = {
                  fullname,
                  phone,
                  email,
                  photo,
                  uid,
                  firebase_access_token,
                };
                googleUserModel
                  .create(userToCreate)
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
  },

  updateUser: (req, res) => {
    const { email, fullname, phone, newPassword, currentPassword } = req.body;
    if (!newPassword && !currentPassword) {
      if (!email || !fullname || !phone) {
        res.status(400).json({
          message: "Required fields are missing",
        });
        return;
      }

      userModel
        .findOneAndUpdate({ email }, req.body, { new: true })
        .then((user) => {
          res.status(200).json({
            message: "User updated successfully",
            user,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
          });
        });
    } else {
      userModel
        .findOne({ email })
        .then(async (user) => {
          const isPasswordMatch = await bcrypt.compare(
            currentPassword,
            user.password
          );
          if (isPasswordMatch) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            userModel
              .findOneAndUpdate(
                { email },
                { password: hashedNewPassword },
                { new: true }
              )
              .then((updatedPassword) => {
                res.status(200).json({
                  message: "Password updated successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Something went wrong",
                });
              });
          } else {
            res.status(400).json({
              message: "Current password is incorrect",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong..",
          });
        });
    }
  },

  getUsersByRole: (req, res) => {
    const { role } = req.params;
    if (!role) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    userModel.findOne({ role }).then(user => {
      res.status(200).json({
        data: user,
      });
    }).catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
  }
};

module.exports = authController;

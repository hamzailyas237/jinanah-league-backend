const { mongoose } = require("mongoose");

const googleUserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  uid: {
    type: String,
    required: true,
  },
  firebase_access_token: {
    type: String,
    required: true,
  },
});

const googleUserModel = mongoose.model("google-user", googleUserSchema);
module.exports = googleUserModel;

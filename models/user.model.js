const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: false,
      required: true,
    },
    lastName: {
      type: String,
      default: false,
      required: true,
    },
    eMail: {
      type: String,
      default: false,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: false,
      required: false,
    },
    roles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: false,
        required: false,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserModel);

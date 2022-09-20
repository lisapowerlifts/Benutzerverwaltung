const mongoose = require("mongoose");

const rightModel = new mongoose.Schema(
  {
    name: {
      type: String,
      default: false,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Right", rightModel);

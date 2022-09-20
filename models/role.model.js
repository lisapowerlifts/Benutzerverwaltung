const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: false,
      required: true,
      unique: true,
    },
    rights: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        default: false,
        required: false,
        ref: "Right",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);

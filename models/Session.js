import mongoose from "mongoose";
import bcrypt from "bcrypt";

const sessionSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      required: true,
      default: true,
    },
    payment: {
      type: String,
      required: false,
      trim: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;

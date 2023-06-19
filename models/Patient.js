import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    adress: {
      type: String,
      require: true,
      trim: true,
    },
    years: {
      type: Number,
      require: true,
      trim: true,
    },
    dni: {
      type: Number,
      require: true,
      trim: true,
    },
    phone: {
      type: Number,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    diagnostico: {
      type: String,
      require: true,
      trim: true,
    },
    obraSocial: {
      type: String,
      require: true,
      trim: true,
    },
    derivacion: {
      type: String,
      require: true,
      trim: true,
    },
    tratamientoComplementario: {
      type: String,
      require: true,
      trim: true,
    },
    observaciones: {
      type: String,
      require: true,
      trim: true,
    },
    originator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema)

export default Patient
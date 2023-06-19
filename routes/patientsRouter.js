import express from "express";
import {
  getPatients,
  newPatient,
  getOnePatient,
  editPatient,
  deletePatient,
} from "../controllers/patientController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
    .route("/")
    .get(checkAuth, getPatients)
    .post(checkAuth, newPatient);
    router
  .route("/:id")
  .get(checkAuth, getOnePatient)
  .put(checkAuth, editPatient)
  .delete(checkAuth, deletePatient);
router.get("/sessions/:id", checkAuth, getOnePatient);

export default router;

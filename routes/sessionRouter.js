import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  addSession,
  getSession,
  editSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", checkAuth, addSession);
router
  .route("/:id")
  .get(checkAuth, getSession)
  .put(checkAuth, editSession)
  .delete(checkAuth, deleteSession);

export default router;

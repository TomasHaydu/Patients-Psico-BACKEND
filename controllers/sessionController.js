import Patient from "../models/Patient.js";
import Session from "../models/Session.js";

const addSession = async (req, res) => {
  const { patient } = req.body;

  const patientExist = await Patient.findById(patient);

  if (!patientExist) {
    const error = new Error("El Paciente no existe");
    return res.status(404).json({ msg: error.message });
  }
  if (patientExist.originator.toString() !== req.user._id.toString()) {
    const error = new Error(
      "No tienes los permisos para acceder a esta pagina"
    );
    return res.status(403).json({ msg: error.message });
  }

  try {
    const sessionSaved = await Session.create(req.body);
    patientExist.sessions.push(sessionSaved._id)
    await patientExist.save()
    res.json(sessionSaved);
  } catch (error) {
    console.log(error);
  }
};

const getSession = async (req, res) => {
  const { id } = req.params;
  const session = await Session.findById(id).populate("patient");

  if (!session) {
    const error = new Error("Session no encontrada");
    return res.status(404).json({ msg: error.message });
  }
  if (session.patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no valida");
    return res.status(403).json({ msg: error.message });
  }
  res.json(session);
};
const editSession = async (req, res) => {
  const { id } = req.params;
  const session = await Session.findById(id).populate("patient");

  if (!session) {
    const error = new Error("Session no encontrada");
    return res.status(404).json({ msg: error.message });
  }
  if (session.patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no valida");
    return res.status(403).json({ msg: error.message });
  }
  session.date = req.body.date || session.date;
  session.paid = req.body.paid || session.paid;
  session.payment = req.body.payment || session.payment;

  try {
    const sessionSaved = await session.save();
    res.json(sessionSaved);
  } catch (error) {
    console.log(error);
  }
};
const deleteSession = async (req, res) => {
  const { id } = req.params;
  const session = await Session.findById(id).populate("patient");

  if (!session) {
    const error = new Error("Session no encontrada");
    return res.status(404).json({ msg: error.message });
  }
  if (session.patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no valida");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await session.deleteOne();
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export { addSession, getSession, editSession, deleteSession };

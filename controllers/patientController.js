import Patient from "../models/Patient.js";
import Session from "../models/Session.js";

const getPatients = async (req, res) => {
  const patients = await Patient.find()
    .where("originator")
    .equals(req.user)
    .select(
      "-observaciones -adress -derivacion -diagnostico -dni -email -obraSocial -sessions -tratamientoComplementario"
    );
  res.json(patients);
};

const newPatient = async (req, res) => {
  const patient = new Patient(req.body);
  patient.originator = req.user._id;

  try {
    const patientSaved = await patient.save();
    res.json(patientSaved);
  } catch (error) {
    console.log(error);
  }
};

const getOnePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id).populate("sessions");

  if (!patient) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }
  const sessions = await Session.find().where("patient").equals(patient._id);
  patient.sessions = sessions;
  res.json(patient);
};

const editPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }
  patient.name = req.body.name || patient.name;
  patient.lastName = req.body.lastName || patient.lastName;
  patient.adress = req.body.adress || patient.adress;
  patient.years = req.body.years || patient.years;
  patient.dni = req.body.dni || patient.dni;
  patient.phone = req.body.phone || patient.phone;
  patient.email = req.body.email || patient.email;
  patient.diagnostico = req.body.diagnostico || patient.diagnostico;
  patient.obraSocial = req.body.obraSocial || patient.obraSocial;
  patient.derivacion = req.body.derivacion || patient.derivacion;
  patient.tratamientoComplementario =
    req.body.tratamientoComplementario || patient.tratamientoComplementario;
  patient.observaciones = req.body.observaciones || patient.observaciones;

  try {
    const patientSaved = await patient.save();
    res.json(patientSaved);
  } catch (error) {
    console.log(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (patient.originator.toString() !== req.user._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await patient.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { getPatients, newPatient, getOnePatient, editPatient, deletePatient };

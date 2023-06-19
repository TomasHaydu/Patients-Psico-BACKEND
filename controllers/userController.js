import { emailOlvidePassword, emailRegister } from "../helpers/email.js";
import idGenerator from "../helpers/idGenerator.js";
import jwtGenerator from "../helpers/jwtGenerator.js";
import User from "../models/User.js";

const registration = async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = idGenerator();
    await user.save();
    emailRegister({
      email: user.email,
      name: user.name,
      token: user.token,
    });
    res.json({
      msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (!user.confirm) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtGenerator(user._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmUser = async (req, res) => {
  const { token } = req.params;
  const userConfirmed = await User.findOne({ token });

  if (!userConfirmed) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirmed.confirm = true;
    userConfirmed.token = "";
    await userConfirmed.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = idGenerator();
    await user.save();
    emailOlvidePassword({
      email: user.email,
      name: user.name,
      token: user.token,
    });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;
  const correctToken = await User.findOne({ token });

  if (correctToken) {
    res.json({ msg: "Token valido, usuario ya existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";

    try {
      await user.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export {
  registration,
  authenticate,
  confirmUser,
  forgetPassword,
  checkToken,
  newPassword,
  profile,
};

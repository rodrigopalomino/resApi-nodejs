import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const nuevoUsuario = async (
  username: string,
  lastname: string,
  correo: string,
  password: string
) => {
  if (![username, lastname, correo, password].every(Boolean)) {
    return {
      userError: `Campo requerido`,
      lastnameError: `Campo requerido`,
      correoError: `Campo requerido`,
      passwordError: `Campo requerido`,
      status: 400,
    };
  }

  const auser = await User.findOne({ where: { username: username } });
  if (auser) {
    return {
      error: `El usuario ya existe`,
      status: 400,
    };
  }

  const hashPassword = await bcrypt.hash(password, 8);

  try {
    await User.create<UserModel>({
      id: 0,
      username,
      lastname,
      correo,
      password: hashPassword,
    });

    return { msg: `El usuario ${username} fue creado`, status: 200 };
  } catch (error) {
    return { msg: `Error al crear usuario`, error, status: 400 };
  }
};

export const loginUsuario = async (username: string, password: string) => {
  if (username == "") {
    return {
      userError: `campo requerido`,
      passwordError: "",
      status: 400,
    };
  }

  if (password == "") {
    return {
      userError: ``,
      passwordError: "campo requerido",
      status: 400,
    };
  }

  if (![username, password].every(Boolean)) {
    return {
      userError: `campo requerido`,
      passwordError: "campo requerido",
      status: 400,
    };
  }

  const user = await User.findOne({ where: { username: username } });

  if (!user) {
    return {
      userError: `El usuario no existe`,
      passwordError: "",
      status: 400,
    };
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return { userError: "", passwordError: `Password Invalida`, status: 400 };
  }

  const token = jwt.sign(
    {
      username,
      id: user.id,
    },
    process.env.SECRET_KEY || "rod",
    { expiresIn: "5m" }
  );

  return { msg: "ingreso exitoso", token, status: 200 };
};

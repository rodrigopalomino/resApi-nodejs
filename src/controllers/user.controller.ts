import { Request, Response } from "express";
import { loginUsuario, nuevoUsuario } from "../services/userServices";
import { handleHttp } from "../utils/error.handle";

export const newUser = async (req: Request, res: Response) => {
  const { username, lastname, correo, password } = req.body;

  try {
    const response = await nuevoUsuario(username, lastname, correo, password);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_newUser_user", 400, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await loginUsuario(username, password);
    res.status(response.status).json(response);
  } catch (error) {
    handleHttp(res, "error_loginUser_user", 400, error);
  }
};

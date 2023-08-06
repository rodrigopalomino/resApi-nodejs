import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { DecodedToken } from "../interfaces/decodeToken.interfaces";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from "../services/productServices";
import { handleHttp } from "../utils/error.handle";
import { User } from "../models/user.model";

const decodeToken = (req: Request) => {
  const headerToken = req.headers["authorization"];
  const bearerToken = headerToken?.slice(7);
  const decodeToken = decode(bearerToken || "as") as DecodedToken;
  return decodeToken;
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await getItems();

    const userIds = response.map((product) => product.userId);
    const users = await User.findAll({ where: { id: userIds } });

    const productsWithUserNames = response.map((product) => {
      const user = users.find((user) => user.id === product.userId);
      const userName = user ? user.username : "Usuario Desconocido"; // Fallback name
      return { ...product.toJSON(), userName };
    });

    res.json(productsWithUserNames);
  } catch (error) {
    handleHttp(res, "error_getProducts_product", 400, error);
  }
};

export const getProduct = async ({ params }: Request, res: Response) => {
  const { id } = params;

  try {
    const response = await getItem(id);
    res.json(response);
  } catch (error) {
    handleHttp(res, "error_getProduct_product", 400, error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, stock } = req.body;
  const token = decodeToken(req);

  try {
    const response = await createItem(name, description, stock, token.id);
    res.json(response);
  } catch (error) {
    handleHttp(res, "error_create_product", 400, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await deleteItem(id);
    res.json(response);
  } catch (error) {
    handleHttp(res, "error_deleteProduct_product", 400, error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, stock } = req.body;

  try {
    const response = await updateItem(id, name, description, stock);
    res.json(response);
  } catch (error) {
    handleHttp(res, "error_updateProducts_product", 400, error);
  }
};

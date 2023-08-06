import { Product as ProductInterfaces } from "../interfaces/product.interfaces";
import { Product } from "../models/product.model";

export const getItems = async () => {
  const response = await Product.findAll();
  return response;
};

export const getItem = async (id: string) => {
  if (![id].every(Boolean)) {
    return `Todos los campos son necesarios`;
  }

  const response = await Product.findOne({ where: { id: id } });
  return response;
};

export const createItem = async (
  name: string,
  description: string,
  stock: number,
  userId: number
) => {
  if (![name, description, stock, userId].every(Boolean)) {
    return `Todos los campos son necesarios`;
  }

  await Product.create({
    id: 0,
    name,
    description,
    stock,
    userId,
  });
  return `Producto creado`;
};

export const deleteItem = async (id: string) => {
  if (![id].every(Boolean)) {
    return `Todos los campos son necesarios`;
  }

  const product = await Product.findOne({ where: { id: id } });

  if (!product) {
    return `El Producto con id: ${id} no existe`;
  }

  await Product.destroy({ where: { id: id } });

  return `El producto ${id} a sido borrados`;
};

export const updateItem = async (
  id: string,
  name: string,
  description: string,
  stock: number
) => {
  if (![name, description, stock].every(Boolean)) {
    return `Todos los campos son necesarios`;
  }

  const product = await Product.findOne({ where: { id: id } });

  if (!product) {
    return `No existe el producto con id: ${id}`;
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.stock = stock || product.stock;

  await product.save();

  return `El producto con id: ${id} a sido actualizado`;
};

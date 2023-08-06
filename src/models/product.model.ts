import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
import { Product as ProductInterfaces } from "../interfaces/product.interfaces";

export interface ProductModel
  extends Model<ProductInterfaces>,
    ProductInterfaces {}

export const Product = sequelize.define<ProductModel>("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

Product.belongsTo(User, {
  foreignKey: "userId",
  as: "creador",
});

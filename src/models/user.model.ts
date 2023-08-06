import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";
import { User as UserInterfaces } from "../interfaces/user.interfaces";

export interface UserModel extends Model<UserInterfaces>, UserInterfaces {}

export const User = sequelize.define<UserModel>("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

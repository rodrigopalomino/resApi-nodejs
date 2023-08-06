import express from "express";
import { router } from "../routes";
import cors from "cors";
import { Product } from "./product.model";
import { User } from "./user.model";

export class Server {
  private app: express.Application;
  private PORT: string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3001";

    this.listen();

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`ejecutandose en el puerto ${this.PORT}`);
    });
  }

  routes() {
    this.app.use(router);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await User.sync();
      await Product.sync();
    } catch (error) {
      console.log("A ocurrido un error con la conexion a la base de datos");
      console.log("error", error);
    }
  }
}

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { validateToken } from "../middlewares/validate-token";

const router = Router();

router.get("/", validateToken, getProducts);
router.get("/:id", validateToken, getProduct);

router.post("/create", validateToken, createProduct);

router.delete("/delete/:id", validateToken, deleteProduct);

router.put("/update/:id", validateToken, updateProduct);

export { router };

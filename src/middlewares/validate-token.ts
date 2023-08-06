import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import { DecodedToken } from "../interfaces/decodeToken.interfaces";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"];

  //verificamos si tiene token
  if (headerToken != undefined) {
    //si tiene token

    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "rod");
      const decodeToken = decode(bearerToken) as DecodedToken;
      next();
    } catch (error) {
      res.status(401).json({
        msg: "token no valido",
      });
    }
  } else {
    res.status(400).json({
      msg: "token no valido",
    });
  }
};

import { Response } from "express";

const handleHttp = (
  res: Response,
  error: string,
  status: number,
  errorRaw?: any
) => {
  console.log(errorRaw);
  res.status(status);
  res.send({ error });
};

export { handleHttp };

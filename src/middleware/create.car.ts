import { NextFunction, Request, Response } from 'express';
import { carSchema } from '../validation/car.validation';

export const validateCreateCar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsed = carSchema
    .strip()
    .safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.errors.map((err) => err.message),
    });
    return;
  }
  req.body = parsed.data;
  next();
};

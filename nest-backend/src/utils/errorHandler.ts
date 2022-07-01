import { Response } from 'express';
export function myError(res: Response, error: Error) {
  res.status(500).send({
    success: false,
    message: error.message ? error.message : error,
  });
}

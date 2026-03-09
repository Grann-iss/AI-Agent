// backend/src/controller/AuthController.ts
import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  res.json({ token: 'mock-token', user: { id: 1, name: 'admin' } });
};

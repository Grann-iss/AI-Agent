// backend/src/interceptor/AuthInterceptor.ts
import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../service/AuthService';

export const authInterceptor = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token && authenticate(token)) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

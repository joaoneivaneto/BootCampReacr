import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfing from '../config/auth';
import AppError from '../errors/AppError';

interface tokenPayload {
  iat: string;
  exp: number;
  sub: string;
}
export default function ensureAuthententicated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeder = request.headers.authorization;
  if (!authHeder) {
    throw new AppError('jwt token is missing', 401);
  }

  const [, token] = authHeder.split(' ');

  try {
    const decoded = verify(token, authConfing.jwt.secret);

    const { sub } = decoded as unknown as tokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('invalid jwt token', 401);
  }
}

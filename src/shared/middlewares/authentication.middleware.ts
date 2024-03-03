import { Injectable, NestMiddleware } from '@nestjs/common';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, verify } from 'jsonwebtoken';

config();

@Injectable()
export class authenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.params.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Id do usuário não fornecido' });
    }

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      const secret = String(process.env.SECRET);
      const decodedToken = verify(token, secret);

      if ((decodedToken as JwtPayload).userId != userId) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'Token não pertence ao usuário' });
      }

      return next();
    } catch (err) {
      return res.json({ error: 'Token inválido' });
    }
  }
}

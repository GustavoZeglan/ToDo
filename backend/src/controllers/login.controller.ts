import { Body, Controller, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createToken } from 'src/shared/utils/createToken';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Controller('login')
export class LoginController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Post()
  async login(@Body() body: any, @Res() res: Response) {
    const user: User = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro de validação',
        details: 'Usuário não cadastrado',
      });
    }

    const isMatch = await compare(body.password, user.password);

    if (isMatch) {
      const token = createToken(user.id);
      return res.status(StatusCodes.OK).json({
        user: { id: user.id, name: user.name, email: user.email },
        token: 'Bearer ' + token,
      });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Erro de validação', details: 'Senha incorreta' });
  }
}

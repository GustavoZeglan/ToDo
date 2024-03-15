import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { passwordGenerator } from 'src/shared/utils/passwordGenerator';
import { User } from '../models/user.entity';
import { UsersService } from '../providers/user.service';
import { userSchema } from '../schemas/user.schema';

@Controller('signup')
export class SignUpController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const bodyUser = await userSchema.omit({ id: true }).parseAsync(body);

    const savedUser = await this.usersService.findOneByEmail(bodyUser.email);

    if (savedUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao cadastrar usuário',
        details: 'Usuário já cadastrado',
      });
    }

    const user = new User();
    user.name = bodyUser.name;
    user.email = bodyUser.email;

    const hashedPasword = await passwordGenerator(bodyUser.password);

    if (!hashedPasword) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao cadastrar usuário',
        details: 'Ocorreu um erro inesperado',
      });
    }

    user.password = hashedPasword;

    await this.usersService.insert(user);

    return res.status(StatusCodes.CREATED).json({
      message: 'Usuário cadastrado com sucesso!',
    });
  }
}

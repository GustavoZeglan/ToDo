import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findUser(@Param() params: any) {
    console.log(params.id);
    const user = await this.usersService.findOneById(params.id);
    if (user === null) {
      return { error: 'O usuário informado não existe' };
    }
    return user;
  }
}

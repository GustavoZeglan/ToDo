import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodValidationMiddleware } from 'src/shared/middlewares/zod-validation.middleware';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.entity';
import { UsersService } from '../providers/user.service';
import { userSchema } from '../schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersService, UserModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule implements NestModule {
  configure(builder: MiddlewareConsumer) {
    builder.apply(ZodValidationMiddleware(userSchema)).forRoutes('user/*');
  }
}

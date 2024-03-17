import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodValidationMiddleware } from 'src/shared/middlewares/zod-validation.middleware';
import { LoginController } from '../controllers/login.controller';
import { User } from '../models/user.entity';
import { userSchema } from '../schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [LoginController],
})
export class LoginModule implements NestModule {
  configure(builder: MiddlewareConsumer) {
    builder
      .apply(ZodValidationMiddleware(userSchema.omit({ id: true, name: true })))
      .forRoutes('login');
  }
}

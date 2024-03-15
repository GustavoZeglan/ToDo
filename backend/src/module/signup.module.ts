import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZodValidationMiddleware } from 'src/shared/middlewares/zod-validation.middleware';
import { SignUpController } from '../controllers/signup.controller';
import { User } from '../models/user.entity';
import { UsersService } from '../providers/user.service';
import { userSchema } from '../schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [SignUpController],
  providers: [UsersService],
})
export class SignUpModule implements NestModule {
  configure(builder: MiddlewareConsumer) {
    builder
      .apply(ZodValidationMiddleware(userSchema.omit({ id: true })))
      .forRoutes('signup');
  }
}

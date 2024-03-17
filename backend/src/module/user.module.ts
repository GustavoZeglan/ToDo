import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authenticationMiddleware } from 'src/shared/middlewares/authentication.middleware';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.entity';
import { UsersService } from '../providers/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersService, UserModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticationMiddleware).forRoutes('user/*');
  }
}

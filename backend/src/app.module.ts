import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cors from 'cors';
import { CollectionModule } from './module/collection.module';
import { DatabaseModule } from './module/database.module';
import { LoginModule } from './module/login.module';
import { SignUpModule } from './module/signup.module';
import { TaskModule } from './module/task.module';
import { UserModule } from './module/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    CollectionModule,
    TaskModule,
    LoginModule,
    SignUpModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: process.env.FRONTEND_URL,
        }),
      )
      .forRoutes('*');
  }
}

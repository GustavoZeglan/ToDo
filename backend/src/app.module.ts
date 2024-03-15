import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cors from 'cors';
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
          origin: 'http://localhost:3000', // URL do seu front-end Next.js
        }),
      )
      .forRoutes('*');
  }
}

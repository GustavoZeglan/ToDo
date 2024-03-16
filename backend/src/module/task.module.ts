// eslint-disable-next-line prettier/prettier
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { Task } from '../models/task.entity';
import { CollectionsService } from '../providers/collection.service';
import { TasksService } from '../providers/task.service';
import { UsersService } from '../providers/user.service';
import { TaskSchema } from '../schemas/task.schema';
import { authenticationMiddleware } from '../shared/middlewares/authentication.middleware';
import { ZodValidationMiddleware } from '../shared/middlewares/zod-validation.middleware';
import { CollectionModule } from './collection.module';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule, CollectionModule],
  exports: [TypeOrmModule, TaskModule],
  controllers: [TaskController],
  providers: [TasksService, UsersService, CollectionsService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticationMiddleware).forRoutes(':userId/*');

    consumer
      .apply(ZodValidationMiddleware(TaskSchema.omit({ taskId: true })))
      .forRoutes(
        { path: '*task', method: RequestMethod.POST },
        { path: '*task', method: RequestMethod.PUT },
      );
  }
}

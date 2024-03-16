// eslint-disable-next-line prettier/prettier
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionController } from '../controllers/collection.controller';
import { Collection } from '../models/collection.entity';
import { CollectionsService } from '../providers/collection.service';
import { UsersService } from '../providers/user.service';
import { colleactionSchema } from '../schemas/collection.schema';
import { authenticationMiddleware } from '../shared/middlewares/authentication.middleware';
import { ZodValidationMiddleware } from '../shared/middlewares/zod-validation.middleware';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collection]), UserModule],
  exports: [TypeOrmModule, CollectionModule, CollectionsService],
  controllers: [CollectionController],
  providers: [CollectionsService, UsersService],
})
export class CollectionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticationMiddleware).forRoutes(':userId/*');

    consumer
      .apply(
        ZodValidationMiddleware(colleactionSchema.omit({ collectionId: true })),
      )
      .forRoutes(
        { path: '*collection*', method: RequestMethod.POST },
        { path: '*collection*', method: RequestMethod.PUT },
      );
  }
}

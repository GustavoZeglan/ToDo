import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Collection } from '../models/collection.entity';
import { CollectionsService } from '../providers/collection.service';
import { UsersService } from '../providers/user.service';
import { colleactionSchema } from '../schemas/collection.schema';

@Controller()
export class CollectionController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly usersService: UsersService,
  ) {}

  @Post(':userId/collection')
  async create(@Param('userId') id: any, @Body() body, @Res() res: Response) {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao criar coleção',
        details: 'Usuário informado não cadastrado',
      });
    }

    const bodyCollection = await colleactionSchema
      .omit({ collectionId: true })
      .parseAsync(body);

    const collection = new Collection(
      bodyCollection.collectionName,
      bodyCollection.image,
      bodyCollection.color,
      user,
    );

    await this.collectionsService.insert(collection);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Coleção criada com sucesso' });
  }
}

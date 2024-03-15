/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
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

  @Get(':userId/collection/:id')
  async findOneById(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const collection = await this.collectionsService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'Usuário informado não cadastrado',
      });
    }

    if (!collection) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'Coleção informada não cadastrada',
      });
    }

    const collectionBelongsToUser =
      await this.collectionsService.verifyUserCollection(user, collection);

    if (!collectionBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'A coleção não pertence ao usuário informado',
      });
    }

    return res.status(StatusCodes.OK).json(collection);
  }

  @Get(':userId/collection')
  async findManyByUserId(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleções',
        details: 'Usuário informado não cadastrado',
      });
    }

    const collections = await this.collectionsService.findManyByUser(user);

    return res.status(StatusCodes.OK).json(collections);
  }

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

  @Put(':userId/collection/:id')
  async update(@Param() param: any, @Body() body, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const collection = await this.collectionsService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'Usuário informado não cadastrado',
      });
    }

    if (!collection) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'Coleção informada não cadastrada',
      });
    }

    const collectionBelongsToUser =
      await this.collectionsService.verifyUserCollection(user, collection);

    if (!collectionBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar coleção',
        details: 'A coleção não pertence ao usuário informado',
      });
    }

    const newCollection = new Collection(body.collectionName,body.image,body.color,user);

    await this.collectionsService.update(param.id, newCollection)

    return res.status(StatusCodes.OK).json({message: "Coleção atualizada com sucesso"});
  }

  @Delete(':userId/collection/:id')
  async delete(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const collection = await this.collectionsService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao excluir coleção',
        details: 'Usuário informado não cadastrado',
      });
    }

    if (!collection) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao excluir coleção',
        details: 'Coleção informada não cadastrada',
      });
    }

    const collectionBelongsToUser =
      await this.collectionsService.verifyUserCollection(user, collection);

    if (!collectionBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao excluir coleção',
        details: 'A coleção não pertence ao usuário informado',
      });
    }

    await this.collectionsService.deleteCollectionWithTasks(collection);

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Coleção excluída com sucesso' });
  }
}
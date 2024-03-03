// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Task } from '../models/task.entity';
import { CollectionsService } from '../providers/collection.service';
import { TasksService } from '../providers/task.service';
import { UsersService } from '../providers/user.service';
import { TaskSchema } from '../schemas/task.schema';

@Controller()
export class TaskController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly collectionsService: CollectionsService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':userId/task/:id')
  async getOneById(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const task = await this.tasksService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar tarefa',
        details: 'O usuário informado não existe',
      });
    }

    if (!task) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar tarefa',
        details: 'A tarefa informada não existe',
      });
    }

    const taskBelongsToUser = this.tasksService.verifyUserTask(user, task);

    if (!taskBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar tarefa',
        details: 'A tarefa não pertence ao usuário informado',
      });
    }

    return res.status(StatusCodes.OK).json(task);
  }

  @Get(':userId/:collectionId/task')
  async getManyByCollectionId(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const collection = await this.collectionsService.findOneById(
      param.collectionId,
    );

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar tarefas',
        details: 'O usuário informado não existe',
      });
    }

    if (!collection) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao buscar tarefas',
        details: 'A coleção informada não existe',
      });
    }

    const collectionBelongsToUser =
      this.collectionsService.verifyUserCollection(user, collection);

    if (!collectionBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao criar tarefa',
        details: 'A coleção não pertence ao usuário informado',
      });
    }

    const tasks = await this.tasksService.findManyByCollection(collection);

    return res.status(StatusCodes.OK).json({ tasks: tasks });
  }

  @Post(':userId/:collectionId/task')
  async create(@Param() param: any, @Body() body: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const collection = await this.collectionsService.findOneById(
      param.collectionId,
    );

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao criar tarefa',
        details: 'O usuário informado não existe',
      });
    }

    if (!collection) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao criar tarefa',
        details: 'A coleção informada não existe',
      });
    }

    const collectionBelongsToUser =
      this.collectionsService.verifyUserCollection(user, collection);

    if (!collectionBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao criar tarefa',
        details: 'A coleção não pertence ao usuário informado',
      });
    }

    const bodyTask = await TaskSchema.omit({
      taskId: true,
      isDone: true,
    }).parseAsync(body);

    const task = new Task(bodyTask.name, bodyTask.description, false, user);

    task.collection = collection;

    await this.tasksService.insert(task);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Tarefa criada com sucesso' });
  }

  @Put(':userId/task/:id')
  async update(@Param() param: any, @Body() body: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const task = await this.tasksService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao atualizar tarefa',
        details: 'O usuário informado não existe',
      });
    }

    if (!task) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao atualizar tarefa',
        details: 'A tarefa informada não existe',
      });
    }

    const taskBelongsToUser = this.tasksService.verifyUserTask(user, task);

    if (!taskBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao atualizar tarefa',
        details: 'A tarefa não pertence ao usuário informado',
      });
    }

    const bodyTask = await TaskSchema.omit({ taskId: true }).parseAsync(body);

    const updatedTask = new Task(
      bodyTask.name,
      bodyTask.description,
      bodyTask.isDone ?? false,
      user,
    );

    await this.tasksService.update(param.id, updatedTask);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Tarefa atualizada com sucesso' });
  }

  @Delete(':userId/task/:id')
  async delete(@Param() param: any, @Res() res: Response) {
    const user = await this.usersService.findOneById(param.userId);
    const task = await this.tasksService.findOneById(param.id);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao deletar tarefa',
        details: 'O usuário informado não existe',
      });
    }

    if (!task) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao deletar tarefa',
        details: 'A tarefa informada não existe',
      });
    }

    const taskBelongsToUser = this.tasksService.verifyUserTask(user, task);

    if (!taskBelongsToUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Erro ao deletar tarefa',
        details: 'A tarefa não pertence ao usuário informado',
      });
    }

    await this.tasksService.delete(param.id);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Tarefa deletada com sucesso' });
  }
}

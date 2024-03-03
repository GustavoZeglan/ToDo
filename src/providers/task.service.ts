import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../models/collection.entity';
import { Task } from '../models/task.entity';
import { User } from '../models/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findOneById(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id: id });
    return task;
  }

  async findManyByCollection(
    collection: Collection,
  ): Promise<Array<Task> | void> {
    const tasks = await this.taskRepository.findBy({ collection: collection });
    return tasks;
  }

  async verifyUserTask(user: User, task: Task): Promise<boolean | void> {
    const taskBelongsToUser = await this.taskRepository.findOne({
      where: { id: task.id, user: user },
    });
    if (taskBelongsToUser) {
      return true;
    } else {
      return false;
    }
  }

  async insert(task: Task): Promise<void> {
    await this.taskRepository.save(task);
  }

  async update(id: number, task: Task): Promise<void> {
    await this.taskRepository.update(id, task);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

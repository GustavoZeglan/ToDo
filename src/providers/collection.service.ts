import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../models/collection.entity';
import { User } from '../models/user.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  findOneById(id: number): Promise<Collection | null> {
    return this.collectionRepository.findOneBy({ id: id });
  }

  findOneByUser(user: User): Promise<Collection | null> {
    return this.collectionRepository.findOneBy({ user: user });
  }

  async verifyUserCollection(
    user: User,
    collection: Collection,
  ): Promise<boolean | void> {
    const collectionBelongsToUser = await this.collectionRepository.findOne({
      where: { id: collection.id, user: user },
    });
    if (collectionBelongsToUser) {
      return true;
    } else {
      return false;
    }
  }

  insert(collection: Collection): Promise<Collection | null> {
    return this.collectionRepository.save(collection);
  }
}

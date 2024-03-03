import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  insert(user: User): Promise<User | null> {
    return this.userRepository.save(user);
  }
}

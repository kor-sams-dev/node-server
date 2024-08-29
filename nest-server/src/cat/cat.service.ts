import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  fintAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }

  findOneByUUID(uuid: string): Cat {
    return this.cats.find((cat) => cat.uuid === uuid);
  }
}

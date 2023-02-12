import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-core';
import { Repository, In } from 'typeorm';

import { Tag } from './tag.entity';
import { CreateTagInput, DeleteTagInput, UpdateTagInput } from './tag.input';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private TagModel: Repository<Tag>) {}

  async getAllTag() {
    return await this.TagModel.find();
  }

  async getTagByPost(id: number) {
    return await this.TagModel.findBy({ posts: { id } });
  }

  async getExistedTag(tags: string[]) {
    return await this.TagModel.findBy({ name: In(tags) });
  }

  async createTag(payload: CreateTagInput) {
    const tag = new Tag();

    tag.name = payload.name;

    return await this.TagModel.save(tag);
  }

  async readTag(name: string) {
    return await this.TagModel.findOneBy({
      name,
    });
  }

  async updateTag(payload: UpdateTagInput) {
    const tag = (await this.TagModel.findOneBy({ id: payload.id })) as Tag;
    tag.name = payload.name;
    return await this.TagModel.save(tag);
  }

  async deleteTag(payload: DeleteTagInput) {
    try {
      return await this.TagModel.delete({ id: payload.id });
    } catch (error) {
      console.log(error);
      throw new ApolloError(
        'Tag not exists',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }
  }
}

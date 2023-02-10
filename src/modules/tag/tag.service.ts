import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagInput, DeleteTagInput, UpdateTagInput } from './tag.input';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private TagModel: Repository<Tag>) {}

  async getTagByPost(id: number) {
    return await this.TagModel.findBy({ posts: { id } });
  }

  async getAllTag() {
    return await this.TagModel.find();
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
    return await this.TagModel.delete({ id: payload.id });
  }
}

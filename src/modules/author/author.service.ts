import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import {
  ChangePasswordInput,
  CreateAuthorInput,
  DeleteAuthorInput,
  UpdateAuthorInput,
} from './author.input';
import { ApolloError } from 'apollo-server-core';
import { ImageService } from '../image/image.service';
import { FileUploadCreateReadStream } from 'graphql-upload/processRequest.js';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly AuthorModel: Repository<Author>,
    @Inject(ImageService) private readonly ImageService: ImageService,
  ) {}

  async create(payload: CreateAuthorInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);
    const author = new Author();
    author.email = payload.email;
    author.password = password;
    author.username = payload.username;
    return this.AuthorModel.save(author);
  }

  readAll() {
    return this.AuthorModel.find({
      relations: {
        posts: { tags: true },
      },
    });
  }

  read<T>(key: string, value: T) {
    return this.AuthorModel.findOneBy({ [key]: value });
  }

  readById(id: number) {
    return this.AuthorModel.findOne({
      relations: { posts: { tags: true } },
      where: { id },
    });
  }

  async update(
    payload: UpdateAuthorInput,
    createReadStream?: FileUploadCreateReadStream,
  ) {
    const user = await this.AuthorModel.findOneBy({
      id: payload.id,
    });
    let uploadResult = JSON.parse(JSON.stringify({}));
    if (createReadStream) {
      const uploadImage = await this.ImageService.Upload(createReadStream);
      console.log(uploadImage);

      uploadResult = JSON.parse(
        JSON.stringify({
          image: uploadImage.url,
          delete_image: uploadImage.delete,
        }),
      );
    }
    if (user) {
      return await this.AuthorModel.save({
        ...payload,
        ...user,
        ...uploadResult,
      });
    } else {
      throw new ApolloError('User not found!');
    }
  }

  async changePassword(payload: ChangePasswordInput) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(payload.password, salt);
    return this.AuthorModel.update(payload.id, { ...payload, password });
  }

  delete({ id }: DeleteAuthorInput) {
    return this.AuthorModel.delete(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import {
  ChangePasswordInput,
  CreateAuthorInput,
  GetAuthorIdInput,
  UpdateAuthorInput,
} from './author.input';
import { ApolloError } from 'apollo-server-core';
import { ImageService } from '../image/image.service';
import { FileUploadCreateReadStream } from 'graphql-upload/processRequest.js';
import {
  generateVerifyCode,
  hashPassword,
  sendToEmail,
} from 'src/util/utilities';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly AuthorModel: Repository<Author>,
    @Inject(ImageService) private readonly ImageService: ImageService,
  ) {}

  async create(payload: CreateAuthorInput) {
    const verifyCode = generateVerifyCode();
    sendToEmail(payload.email, verifyCode);
    const password = await hashPassword(payload.password);
    const author = new Author();
    author.email = payload.email;
    author.password = password;
    author.username = payload.username;
    author.verifyCode = verifyCode;
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

  async updatePassword(payload: {
    id: number;
    newPassword: string;
    resetPasswordToken?: string | null;
  }) {
    return this.AuthorModel.update(
      { id: payload.id },
      {
        password: payload.newPassword,
        resetPasswordToken: payload.resetPasswordToken,
      },
    );
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

      uploadResult = JSON.parse(
        JSON.stringify({
          image: uploadImage.url,
        }),
      );
    }
    if (user) {
      return await this.AuthorModel.save({
        ...user,
        ...payload,
        ...uploadResult,
      });
    } else {
      throw new ApolloError('User not found!');
    }
  }

  async changePassword(payload: ChangePasswordInput) {
    const password = await hashPassword(payload.password);
    return this.AuthorModel.update(payload.id, { ...payload, password });
  }

  delete({ id }: GetAuthorIdInput) {
    return this.AuthorModel.delete(id);
  }
}

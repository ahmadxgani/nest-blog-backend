import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Author, AuthorDocument } from './author.model';
import {
  CreateAuthorInput,
  DeleteAuthorInput,
  UpdateAuthorInput,
} from './author.input';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private AuthorModel: Model<AuthorDocument>,
  ) {}

  create(payload: CreateAuthorInput) {
    const createdPerson = new this.AuthorModel(payload);
    return createdPerson.save();
  }

  readAll() {
    return this.AuthorModel.find().exec();
  }

  read<T>(key?: string, value?: T | any) {
    return this.AuthorModel.findOne({ [key]: value }).exec();
  }

  update(payload: UpdateAuthorInput) {
    const password = bcrypt.genSalt(10, (err, salt) => {
      if (err)
        throw new HttpException('invalid payload', HttpStatus.BAD_REQUEST);
      return bcrypt.hash(payload.password, salt, (err, hash) => {
        if (err)
          throw new HttpException('invalid payload', HttpStatus.BAD_REQUEST);
        return hash;
      });
    });
    return this.AuthorModel.findByIdAndUpdate(
      payload._id,
      JSON.parse(JSON.stringify({ ...payload, password, _id: undefined })),
      {
        new: true,
      },
    ).exec();
  }

  delete({ _id }: DeleteAuthorInput) {
    return this.AuthorModel.findByIdAndDelete(_id).exec();
  }
}

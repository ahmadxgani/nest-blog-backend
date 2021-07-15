import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  create(@Body() payload: CreatePostInput) {
    const createdPerson = new this.PostModel(payload);
    return createdPerson.save();
  }

  read<T>(key?: string, value?: T | any) {
    return this.PostModel.find({ [key]: value }).exec();
  }

  update(@Body() payload: UpdatePostInput) {
    return this.PostModel.findByIdAndUpdate(
      payload._id,
      JSON.parse(JSON.stringify({ ...payload, _id: undefined })),
      {
        new: true,
      },
    ).exec();
  }

  delete({ _id }: DeletePostInput) {
    return this.PostModel.findByIdAndDelete(_id).exec();
  }
}

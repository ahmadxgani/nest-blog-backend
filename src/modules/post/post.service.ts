import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Post, PostDocument } from './post.model';
import {
  CreatePostInput,
  DeletePostInput,
  UpdatePostInput,
} from './post.input';
import { Author, AuthorDocument } from '../author/author.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    @InjectModel(Author.name) private AuthorModel: Model<AuthorDocument>,
  ) {}

  create(payload: CreatePostInput, _id: ObjectId) {
    const createdPost = new this.PostModel(payload);
    this.AuthorModel.findByIdAndUpdate(_id, {
      $push: { posts: createdPost._id },
    }).exec();
    return createdPost.save();
  }

  read<T>(key?: string, value?: T | any) {
    return this.PostModel.find({ [key]: value }).exec();
  }

  update(payload: UpdatePostInput) {
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

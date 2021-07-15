import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.model';
import { CreatePostPipe, DeletePostPipe, UpdatePostPipe } from './post.pipe';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  create(@Body() payload: CreatePostPipe) {
    const createdPerson = new this.PostModel(payload);
    return createdPerson.save();
  }

  read<T>(key?: string, value?: T | any) {
    return this.PostModel.find({ [key]: value }).exec();
  }

  update(@Body() payload: UpdatePostPipe) {
    return this.PostModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    }).exec();
  }

  delete({ _id }: DeletePostPipe) {
    return this.PostModel.findByIdAndDelete(_id).exec();
  }
}

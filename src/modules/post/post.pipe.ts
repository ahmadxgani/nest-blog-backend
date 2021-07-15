import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Types, ObjectId } from 'mongoose';
import { tags } from 'src/interface/tags.interface';

@Injectable()
export class CreatePostPipe {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  tags: tags[];
}

@Injectable()
export class UpdatePostPipe {
  @IsNotEmpty()
  _id: Types.ObjectId;
  title: string;
  content: string;
  tags: tags[];
}

@Injectable()
export class DeletePostPipe {
  @IsNotEmpty()
  _id: ObjectId;
}

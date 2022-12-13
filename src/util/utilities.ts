import { Field, ObjectType } from '@nestjs/graphql';

export function Slugify(title?: string) {
  return title
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

@ObjectType({ description: 'Return Response Type' })
export class ResponseType {
  @Field(() => Boolean)
  success: boolean;
}

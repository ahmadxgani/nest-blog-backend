import { define } from 'typeorm-seeding';
import { Tag } from './tag.entity';

define(Tag, () => {
  const tag = new Tag();

  return tag;
});

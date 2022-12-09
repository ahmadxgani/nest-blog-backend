import { define } from 'typeorm-seeding';
import { Author } from './author.entity';

define(Author, () => {
  const author = new Author();

  return author;
});

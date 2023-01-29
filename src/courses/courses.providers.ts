import { DataSource } from 'typeorm';
import { Courses } from './entities/courses.entity';
import { Tag } from './entities/tag.entity';

export const coursesProviders = [
  {
    provide: 'COURSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Courses),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: ['DATA_SOURCE'],
  },
];

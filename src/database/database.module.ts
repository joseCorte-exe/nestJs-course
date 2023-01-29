import { Module } from '@nestjs/common';
import { Courses } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tag.entity';
import { databaseProviders } from 'src/data-source';

@Module({
  imports: [Courses, Tag],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

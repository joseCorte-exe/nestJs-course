import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Courses } from './courses.entity';

import { v4 as uuidv4 } from 'uuid';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Courses, (course) => course.tags)
  @JoinTable({ name: 'courses_tags' })
  course: Courses[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  getId() {
    return this.id || uuidv4();
  }

  @BeforeInsert()
  setId() {
    this.id = this.getId();
  }
}

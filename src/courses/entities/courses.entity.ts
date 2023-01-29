/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Tag } from './tag.entity';

import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  instructor: string;

  @Column()
  description: string;

  @ManyToMany(() => Tag, (tag) => tag.course, {
    cascade: true,
  })
  @JoinTable({ name: 'courses_tags' })
  tags: string[];

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

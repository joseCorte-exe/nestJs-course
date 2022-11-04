import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  instructor: string

  @Column()
  description: string;

  @ManyToMany(() => Tag, tag => tag.course, {
    cascade: true
  })
  @JoinTable()
  tags: Array<string>;
}
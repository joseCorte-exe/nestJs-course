import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Courses {
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
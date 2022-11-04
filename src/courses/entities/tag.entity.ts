import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "./courses.entity";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Courses, course => course.tags)
  @JoinTable()
  course: Courses[]
}

import { HttpException, Injectable } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Course } from './entities/course.entity';

export type createCourseType = {
  id?: number,
  name: string,
  description: string,
  instructor: string,
  tags: string[]
}

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Matematica aplicada para ENEM',
      description: 'Matematica para passar em uma boa faculdade com o enem',
      tags: ['course', 'matematica', 'ameninadamatematica', 'ENEM'],
      instructor: 'Gabi'
    }
  ]

  findAll() {
    return {
      message: 'courses listed with success',
      result: this.courses
    }
  }

  findOne(id: string) {
    const course = this.courses.find((course) =>
      course.id === Number(id)
    )

    if (!course)
      throw new HttpException(`Course #${id} NOT FOUND`, HttpStatus.NOT_FOUND)

    return {
      message: 'courses listed with success',
      result: course
    }
  }

  create({
    name,
    description,
    instructor,
    tags
  }: createCourseType) {
    const request: createCourseType = {
      name,
      description,
      instructor,
      id: Number(this.courses.length+1),
      tags
    }

    this.courses.push(request)

    return {
      message: 'Curso cadastrado com sucesso!',
      result: request
    }
  }

  update(id, {
    name,
    description,
    instructor,
    tags
  }: createCourseType) {
    const request = {
      name,
      description,
      instructor,
      tags
    }
    const indexCourse = this.courses.findIndex(course => course.id === id)

    this.courses[indexCourse] = request
  }

  remove(id) {
    const indexCourse = this.courses.findIndex(course =>
      course.id === Number(id)
    )

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1)
    }
  }
}
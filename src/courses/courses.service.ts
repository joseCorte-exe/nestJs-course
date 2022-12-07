import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Courses } from './entities/courses.entity';
import { Tag } from './entities/tag.entity';

export type createCourseType = {
  id?: string;
  name: string;
  description: string;
  instructor: string;
  tags: string[];
};

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private readonly courseRepository: Repository<Courses>,

    @InjectRepository(Courses)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return {
      message: 'courses listed with success',
      result: await this.courseRepository.find({
        relations: ['tags'],
      }),
    };
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id: String(id),
      },
      relations: ['tags'],
    });

    if (!course) throw new NotFoundException(`Course #${id} NOT FOUND`);

    return {
      message: 'courses listed with success',
      result: course,
    };
  }

  async create(createCourseDto: CreateCourseDto) {
    const tags: any = await Promise.all(
      createCourseDto.tags.map((name) => this.preloadTagByName(name)),
    );

    const request: createCourseType = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });

    return this.courseRepository.save(request);
  }

  async update(id: string, UpdateCourseDto: UpdateCourseDto) {
    const tags: any =
      UpdateCourseDto.tags &&
      (await Promise.all(
        UpdateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: String(id),
      ...UpdateCourseDto,
      tags,
    });

    if (!course) throw new NotFoundException(`Course #${id} NOT FOUND`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id: String(id),
      },
    });

    if (!course) throw new NotFoundException(`Course #${id} NOT FOUND`);

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: {
        name: name,
      },
    });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}

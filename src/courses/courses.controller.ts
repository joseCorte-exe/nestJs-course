import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll() {
    return this.courseService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.courseService.findOne(id)
  }

  @Post()
  create(
    @Body() request: CreateCourseDto
  ) {
    return this.courseService.create(request)
  }

  @Put(':id')
  update(
    @Param() { id },
    @Body() request: UpdateCourseDto
  ) {
    return this.courseService.update(id, request)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.courseService.remove(id)
  }
}

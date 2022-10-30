import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CoursesService, createCourseType } from './courses.service';

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
    @Body() request
  ) {
    return this.courseService.create(request)
  }

  @Patch(':id')
  update(
    @Param() { id },
    @Body() body
  ) {
    return this.courseService.update(id, body)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.courseService.remove(id)
  }
}

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

describe('Courses: /courses e2e', () => {
  let app: INestApplication;

  const course = {
    name: 'Nestjs w/ typeorm',
    description: 'Creating apis restful com nestjs',
    instructor: 'me',
    tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
          TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'docker',
          database: 'testdb',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course as CreateCourseDto) 
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCourse = jasmine.objectContaining({
          ...course,
          tags: jasmine.arrayContaining(
            course.tags.map((name) => jasmine.objectContaining({ name }))
          )
        })
        expect(body).toEqual(expectedCourse)
      })
  });
});

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Courses } from './entities/courses.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({ findOne: jest.fn() })

describe('CoursesService', () => {
  let service: CoursesService;
  let coursesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Courses),
          useValue: createMockRepository()
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: createMockRepository()
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    coursesRepository = module.get<MockRepository>(getRepositoryToken(Courses));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('shold search course by id', () => {
      it('should return course object', async () => {
        const courseId = '1';
        const expectedCourse = {};

        coursesRepository.findOne.mockReturnValue(expectedCourse)

        const course = await service.findOne(courseId);
        expect(course.result).toEqual(expectedCourse);
      });
      it('should return NotFoundException', async () => {
        const courseId = '1';

        coursesRepository.findOne.mockReturnValue(undefined)

        try {
          await service.findOne(courseId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});

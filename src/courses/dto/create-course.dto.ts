import { IsString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString({ each: true })
  readonly tags: Array<string>;

  @IsString()
  readonly instructor: string
}
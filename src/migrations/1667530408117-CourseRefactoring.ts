import { MigrationInterface, QueryRunner } from "typeorm"

export class CourseRefactoring1667530408117 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "course" RENAME COLUMN "name" TO "course"`,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "course" RENAME COLUMN "course" TO "name"`,
        ) // reverts things made in "up" method
    }

}

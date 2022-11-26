import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'nestdb',
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/migrations/*.js'],
});
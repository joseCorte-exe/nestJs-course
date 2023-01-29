import { DataSource } from 'typeorm';

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

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'nestdb',
        entities: [__dirname + '/../**/*.entity.js'],
        migrations: [__dirname + '/../dist/migrations/*.js'],
      });
      return dataSource.initialize();
    },
  },
];

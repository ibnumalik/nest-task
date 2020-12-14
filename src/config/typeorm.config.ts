import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'psql',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};

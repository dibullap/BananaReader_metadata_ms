import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';
import { ParseIntPipe } from '@nestjs/common';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql' as 'mysql',
        host: config.get(Configuration.DB_HOST),
        port: Number.parseInt(config.get(Configuration.DB_PORT)),
        username: config.get(Configuration.DB_USER),
        database: config.get(Configuration.DB_NAME),
        password: config.get(Configuration.DB_PASS),
        connectTimeoutMS: undefined,
        autoLoadEntities: true,
        synchronize: !!config.get(Configuration.DB_SYNC),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        retryAttempts: 10,
        retryDelay: 3000
      } as ConnectionOptions
    }
  }),
];
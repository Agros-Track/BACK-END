import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AnimalsModule } from './modules/animals/animals.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductionsModule } from './modules/productions/productions.module';
import { RolesModule } from './modules/roles/roles.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { LocationsModule } from './modules/locations/locations.module';
import { MovementsModule } from './modules/movements/movements.module';
import { HealthModule } from './modules/health/health.module';
import { FeedingModule } from './modules/feeding/feeding.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),

    // TypeORM Module - Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true, // Change false in production
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    AnimalsModule,
    ProductionsModule,
    RolesModule,
    TasksModule,
    TenantModule,
    LocationsModule,
    MovementsModule,
    HealthModule,
    FeedingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(TenantMiddleware)
    .forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationScheduleModule } from './notification-schedule/notification-schedule.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',                   // Service name for PostgreSQL
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'notification_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NotificationScheduleModule,
    RabbitMQModule,
  ],
})
//hellosss
export class AppModule {}
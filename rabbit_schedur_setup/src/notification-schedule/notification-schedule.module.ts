import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationScheduleService } from './notification-schedule.service';
import { NotificationScheduleController } from './notification-schedule.controller';
import { NotificationSchedule } from './entities/notification-schedule.entity';
import { NotificationCronService } from './notification-cron.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([NotificationSchedule]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'], // Directly point to the RabbitMQ service
          queue: 'notifications_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [NotificationScheduleController],
  providers: [NotificationScheduleService, NotificationCronService],
})
export class NotificationScheduleModule {}
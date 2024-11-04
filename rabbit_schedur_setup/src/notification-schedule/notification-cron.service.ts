import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationScheduleService } from './notification-schedule.service';
import { NotificationSchedule, NotificationStatus } from './entities/notification-schedule.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class NotificationCronService implements OnModuleInit {
  constructor(
    private readonly scheduleService: NotificationScheduleService,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  onModuleInit() {
    // Immediately run the handleCron method when the module is initialized
    this.handleCron();
  }

  @Cron(CronExpression.EVERY_30_SECONDS) // Run every minute
  async handleCron() {
    console.log("Running cron job...");
   

    const notifications: NotificationSchedule[] = await this.scheduleService.findDueNotifications();
    console.log("Running cron job... ",notifications);
    for (const notification of notifications) {
      try {
        // Send notification via RabbitMQ
        await this.notificationClient.emit('send_notification', {
          id: notification.id,
          payload: notification.notificationPayload,
        });

        // Update the notification status to TRIGGERED
        notification.status = NotificationStatus.TRIGGERED;
        await this.scheduleService.updateNotification(notification);

        // Optionally wait for confirmation of success, then update status
        // For this example, we assume sending is always successful
        notification.status = NotificationStatus.SUCCESS;
        await this.scheduleService.updateNotification(notification);

      } catch (error) {
        console.error(`Failed to send notification ${notification.id}:`, error);
        
        // Update the status to indicate failure
        notification.status = NotificationStatus.PENDING; // Optionally reschedule or keep it pending
        await this.scheduleService.updateNotification(notification);
      }
    }
  }
}
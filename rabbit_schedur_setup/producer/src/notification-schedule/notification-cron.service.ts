import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationScheduleService } from './notification-schedule.service';
import { NotificationSchedule, NotificationStatus } from './entities/notification-schedule.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class NotificationCronService implements OnModuleInit {
  constructor(
    private readonly scheduleService: NotificationScheduleService,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) { }

  onModuleInit() {
    // Immediately run the handleCron method when the module is initialized
    this.handleCron();
  }

  @Cron(CronExpression.EVERY_30_SECONDS) // Run every minute
  async handleCron() {
    // this.debug(); 

    const notifications: NotificationSchedule[] = await this.scheduleService.findDueNotifications();
    console.log("Running cron job... ", notifications);
    for (const notification of notifications) {
      try {
        // Update the notification status to TRIGGERED
        notification.status = NotificationStatus.TRIGGERED;
        await this.scheduleService.updateNotification(notification);

        // Send notification via RabbitMQ
        await this.notificationClient.send({ cmd: 'sent_wait_notification' }, {
          id: notification.id,
          payload: notification.notificationPayload,
        });


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

  async debug() {
    console.log("Running fake triggers   ");
    let data = await this.notificationClient
      .send({ cmd: 'sent_wait_notification' }, {
        id: "fakeId",
        payload: "fakePayload"
      })
      .toPromise();


    console.log("response: ", data);
    await this.notificationClient.emit('sent_notification', {
      id: "fakeId",
      payload: "fakePayload",
    });

  }
}
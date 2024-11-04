import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationSchedule, NotificationStatus } from './entities/notification-schedule.entity';
import { CreateNotificationScheduleDto } from './dto/create-notification-schedule.dto';
import { LessThanOrEqual } from 'typeorm';
@Injectable()
export class NotificationScheduleService {
  constructor(
    @InjectRepository(NotificationSchedule)
    private notificationRepository: Repository<NotificationSchedule>,
  ) {}

  async scheduleNotification(createDto: CreateNotificationScheduleDto) {
    const notification = this.notificationRepository.create({
      ...createDto,
      status: NotificationStatus.PENDING,
    });
    return this.notificationRepository.save(notification);
  }

  async listScheduledNotifications() {
    return this.notificationRepository.find();
  }

  async deleteScheduledNotification(id: number) {
    return this.notificationRepository.delete(id);
  }

  async findDueNotifications() {
    const now = new Date();

    // Log the current date in local time
    console.log("Current Local Time: ", now.toString());
    // Log the current date in UTC time
    console.log("Current UTC Time: ", now.toISOString());

    const notifications = await this.notificationRepository.find({
        where: {
            scheduledDate: LessThanOrEqual(now), // Find notifications due or already passed
            status: NotificationStatus.PENDING,
        },
    });
    
    return notifications;
}
    // New method to update a notification
    async updateNotification(notification: NotificationSchedule) {
    
      return this.notificationRepository.save(notification);
    }
}